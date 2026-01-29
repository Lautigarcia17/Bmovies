import { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, Paper, TextField, Button, Alert, CircularProgress, Avatar, IconButton } from '@mui/material';
import { Save, CheckCircle, Error as ErrorIcon, PhotoCamera, Cancel } from '@mui/icons-material';
import { useGenericContext } from '../../hooks/useGenericContext';
import { profileContext } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingsPage.module.css';

function ProfileSettingsPage() {
  const { ownProfile, loadingProfile, updateOwnProfile, checkUsername, error: profileError } = useGenericContext(profileContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    avatar_url: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: '' });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (ownProfile) {
      setFormData({
        username: ownProfile.username,
        avatar_url: ownProfile.avatar_url || '',
      });
      setAvatarPreview(ownProfile.avatar_url || '');
    }
  }, [ownProfile]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const validateUsername = async (newUsername: string) => {
    const trimmedUsername = newUsername.trim();
    
    if (!trimmedUsername || trimmedUsername === ownProfile?.username) {
      setUsernameStatus({ checking: false, available: true, message: '' });
      return;
    }

    setUsernameStatus({ checking: true, available: null, message: 'Checking availability...' });

    try {
      const result = await checkUsername(trimmedUsername);
      setUsernameStatus({
        checking: false,
        available: result.available,
        message: result.message || (result.available ? '✓ Username is available!' : '✗ Username not available'),
      });
    } catch (err) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: '✗ Error checking username',
      });
    }
  };

  const handleUsernameChange = (newUsername: string) => {
    setFormData(prev => ({ ...prev, username: newUsername }));

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for validation
    debounceTimerRef.current = setTimeout(() => {
      validateUsername(newUsername);
    }, 600);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
        setSaveError('Please select a PNG or JPG image');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setSaveError('Image size should be less than 2MB');
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSaveError(null);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('');
    setFormData(prev => ({ ...prev, avatar_url: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const trimmedUsername = formData.username.trim();
      
      // Validate username is not empty
      if (!trimmedUsername) {
        setSaveError('Username cannot be empty');
        setSaving(false);
        return;
      }

      const updateData: any = {};

      // Only include username if it changed and is available
      if (trimmedUsername !== ownProfile?.username) {
        if (!usernameStatus.available) {
          setSaveError('Please choose an available username');
          setSaving(false);
          return;
        }
        updateData.username = trimmedUsername;
      }

      // Handle avatar
      if (avatarFile) {
        // In a real app, you would upload to Supabase Storage here
        // For now, we'll use the preview URL
        updateData.avatar_url = avatarPreview;
      } else if (avatarPreview === '' && formData.avatar_url !== '') {
        // User removed the avatar
        updateData.avatar_url = null;
      }

      // If no changes, don't make the request
      if (Object.keys(updateData).length === 0) {
        setSaveError('No changes to save');
        setSaving(false);
        return;
      }

      await updateOwnProfile(updateData);
      setSaveSuccess(true);
      
      // Redirect to profile after success
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = () => {
    // Username cannot be empty
    if (!formData.username.trim()) {
      return false;
    }

    // Check if username changed
    const usernameChanged = formData.username !== ownProfile?.username;
    
    // Check if avatar changed
    const avatarChanged = avatarFile !== null || 
                         (avatarPreview === '' && ownProfile?.avatar_url) ||
                         (avatarPreview && avatarPreview !== ownProfile?.avatar_url);

    // If nothing changed, disable save
    if (!usernameChanged && !avatarChanged) {
      return false;
    }

    // If username changed, it must be validated and available
    if (usernameChanged) {
      return usernameStatus.available === true && !usernameStatus.checking;
    }

    // If only avatar changed, allow save
    return true;
  };

  const getAvatarDisplay = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    return '';
  };

  const getAvatarLetter = () => {
    return formData.username.charAt(0).toUpperCase();
  };

  const getUsernameHelperText = () => {
    if (!formData.username.trim()) {
      return 'Username cannot be empty';
    }
    if (usernameStatus.message) {
      return usernameStatus.message;
    }
    return 'Username will be validated automatically';
  };

  if (loadingProfile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (profileError || !ownProfile) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">Error loading profile. Please try again.</Alert>
      </Container>
    );
  }

  return (
    <Box className={styles.pageContainer} sx={{ minHeight: '100vh', py: 6, px: 2 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: 'rgba(6, 13, 23, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(253, 224, 211, 0.2)',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              mb: 1,
            }}
          >
            Edit Profile
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            Update your profile information
          </Typography>

          {saveSuccess && (
            <Alert
              severity="success"
              icon={<CheckCircle />}
              sx={{
                mb: 3,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                color: '#4caf50',
              }}
            >
              Profile updated successfully! Redirecting...
            </Alert>
          )}

          {saveError && (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{
                mb: 3,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                color: '#d32f2f',
              }}
            >
              {saveError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={getAvatarDisplay()}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    bgcolor: 'primary.main',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#060d17',
                  }}
                >
                  {!getAvatarDisplay() && getAvatarLetter()}
                </Avatar>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                    backgroundColor: 'primary.main',
                    color: '#060d17',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  }}
                >
                  <PhotoCamera />
                </IconButton>

                {avatarPreview && (
                  <IconButton
                    onClick={handleRemoveAvatar}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: -10,
                      backgroundColor: 'rgba(211, 47, 47, 0.9)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 1)',
                      },
                    }}
                  >
                    <Cancel />
                  </IconButton>
                )}
              </Box>
              
              <Typography
                sx={{
                  mt: 2,
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.875rem',
                }}
              >
                Click the camera icon to upload an image (PNG or JPG, max 2MB)
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              disabled={saving}
              sx={{
                mb: 4,
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  color: 'text.primary',
                  '& fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
              helperText={getUsernameHelperText()}
              error={usernameStatus.available === false || !formData.username.trim()}
              FormHelperTextProps={{
                sx: {
                  color: !formData.username.trim()
                    ? '#d32f2f'
                    : usernameStatus.available === true 
                    ? '#4caf50' 
                    : usernameStatus.available === false 
                    ? '#d32f2f' 
                    : 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                },
              }}
              InputProps={{
                endAdornment: usernameStatus.checking ? (
                  <CircularProgress size={20} sx={{ color: 'primary.main' }} />
                ) : null,
              }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                disabled={saving || usernameStatus.checking || !isFormValid()}
                sx={{
                  flex: 1,
                  py: 1.5,
                  backgroundColor: 'primary.main',
                  color: '#060d17',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(253, 224, 211, 0.3)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate('/profile')}
                disabled={saving}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderColor: 'rgba(253, 224, 211, 0.5)',
                  color: 'text.primary',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(253, 224, 211, 0.1)',
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProfileSettingsPage;
