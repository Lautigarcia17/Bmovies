import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, TextField, Button, Alert, CircularProgress, Avatar } from '@mui/material';
import { Save, Person, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { useGenericContext } from '../../hooks/useGenericContext';
import { profileContext } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingsPage.module.css';

function ProfileSettingsPage() {
  const { ownProfile, loadingProfile, updateOwnProfile, checkUsername, error: profileError } = useGenericContext(profileContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
  });

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
        display_name: ownProfile.display_name || '',
        bio: ownProfile.bio || '',
        avatar_url: ownProfile.avatar_url || '',
      });
    }
  }, [ownProfile]);

  const handleUsernameChange = async (newUsername: string) => {
    setFormData(prev => ({ ...prev, username: newUsername }));

    if (!newUsername || newUsername === ownProfile?.username) {
      setUsernameStatus({ checking: false, available: null, message: '' });
      return;
    }

    setUsernameStatus({ checking: true, available: null, message: 'Checking availability...' });

    try {
      const result = await checkUsername(newUsername);
      setUsernameStatus({
        checking: false,
        available: result.available,
        message: result.message || (result.available ? 'Username is available!' : 'Username not available'),
      });
    } catch (err) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Error checking username',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const updateData: any = {
        display_name: formData.display_name || null,
        bio: formData.bio || null,
        avatar_url: formData.avatar_url || null,
      };

      // Only include username if it changed and is available
      if (formData.username !== ownProfile?.username) {
        if (!usernameStatus.available) {
          setSaveError('Please choose an available username');
          setSaving(false);
          return;
        }
        updateData.username = formData.username;
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
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Avatar
                src={formData.avatar_url}
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto',
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                }}
              >
                {!formData.avatar_url && <Person sx={{ fontSize: 50 }} />}
              </Avatar>
            </Box>

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              disabled={usernameStatus.checking || saving}
              sx={{
                mb: 3,
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
              helperText={usernameStatus.message}
              error={usernameStatus.available === false}
              FormHelperTextProps={{
                sx: {
                  color: usernameStatus.available === true 
                    ? '#4caf50' 
                    : usernameStatus.available === false 
                    ? '#d32f2f' 
                    : 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <TextField
              fullWidth
              label="Display Name (optional)"
              value={formData.display_name}
              onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
              disabled={saving}
              sx={{
                mb: 3,
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
            />

            <TextField
              fullWidth
              label="Bio (optional)"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={saving}
              multiline
              rows={4}
              sx={{
                mb: 3,
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
            />

            <TextField
              fullWidth
              label="Avatar URL (optional)"
              value={formData.avatar_url}
              onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
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
              helperText="Enter a URL to an image for your avatar"
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                disabled={saving || usernameStatus.checking || (formData.username !== ownProfile.username && !usernameStatus.available)}
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
