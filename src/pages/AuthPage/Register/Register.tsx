import { toast } from 'react-hot-toast'
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Grid } from '@mui/material';
import { LockOutlined, AlternateEmail, HowToReg, AssignmentIndOutlined, CakeOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

function Register({ setShowLogin }: { setShowLogin: () => void }) {

  const { signUp, register, handleSubmit, errors, watch } = useGenericContext(authContext)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const passwordValue = watch("password");

  useEnterClick(buttonRef);

  const onSubmit = async (dataUser: any) => {
    if (dataUser !== null && !isSubmitting) {
      setIsSubmitting(true);
      const { data, error } = await signUp(dataUser);
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message, { position: 'top-right', duration: 2000 });
      } else {
        toast.success(`Congratulations ${data?.user?.user_metadata.username}! you have logged in`, { position: 'top-right', duration: 2000 });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1rem',
          textAlign: 'center',
          mb: 1,
        }}
      >
        Create your account and start building your collection
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              autoComplete="off"
              error={!!errors.username}
              helperText={
                errors.username?.type === 'required' ? 'Username is required' :
                  errors.username?.type === 'pattern' ? 'Username cannot contain symbols' : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndOutlined sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(253, 224, 211, 0.03)',
                  '& fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
              }}
              {...register('username', {
                required: true,
                pattern: /^[a-zA-Z0-9\\s]+$/,
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              variant="outlined"
              type="number"
              error={!!errors.age}
              helperText={errors.age?.type === 'required' ? 'Age is required' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeOutlined sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(253, 224, 211, 0.03)',
                  '& fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
              }}
              {...register('age', { required: true })}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          autoComplete="off"
          error={!!errors.email}
          helperText={
            errors.email?.type === 'required' ? 'Email is required' :
              errors.email?.type === 'pattern' ? 'Invalid email format' : ''
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(253, 224, 211, 0.03)',
              '& fieldset': {
                borderColor: 'rgba(253, 224, 211, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(253, 224, 211, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
          {...register("email", {
            required: true,
            pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
          })}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={
            errors.password?.type === 'required' ? 'Password is required' :
              errors.password?.type === 'pattern' ? 'Password cannot contain spaces' : ''
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
            endAdornment: passwordValue && (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowPassword((prev) => !prev)} 
                  edge="end"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 224, 211, 0.1)',
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(253, 224, 211, 0.03)',
              '& fieldset': {
                borderColor: 'rgba(253, 224, 211, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(253, 224, 211, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
          {...register("password", {
            required: true,
            pattern: /^[^\\s]+$/,
          })}
        />
      </Box>

      <Button
        ref={buttonRef}
        type='submit'
        size='large'
        variant="contained"
        startIcon={<HowToReg />}
        fullWidth
        disabled={isSubmitting}
        sx={{
          py: 1.8,
          fontSize: '1.1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          backgroundColor: 'primary.main',
          color: '#060d17',
          borderRadius: 2,
          mt: 1,
          boxShadow: '0 10px 30px rgba(253, 224, 211, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'primary.light',
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 40px rgba(253, 224, 211, 0.4)',
          },
          '&:disabled': {
            backgroundColor: 'rgba(253, 224, 211, 0.3)',
            color: 'rgba(6, 13, 23, 0.5)',
          },
        }}
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>

      <Box
        sx={{
          mt: 1,
          pt: 3,
          borderTop: '1px solid rgba(253, 224, 211, 0.1)',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.95rem',
          }}
        >
          Already have an account?{' '}
          <Box
            component="button"
            type='button'
            onClick={setShowLogin}
            sx={{
              background: 'none',
              border: 'none',
              color: 'primary.main',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'primary.light',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              },
            }}
          >
            Sign In
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register