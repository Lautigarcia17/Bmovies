import { toast } from 'react-hot-toast'
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LockOutlined, AlternateEmail, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

function Login({ setShowLogin }: { setShowLogin: () => void }) {

  const { signIn, register, handleSubmit, errors, watch } = useGenericContext(authContext)

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password");

  useEnterClick(buttonRef);

  const onSubmit = async (dataUser: any) => {
    const { data, error } = await signIn(dataUser);

    if (error) {
      toast.error(error.message, { position: 'top-right', duration: 2000 });
    }
    else {
      toast.success(`Congratulations ${data?.user?.user_metadata.username}! you have logged in`, { position: 'top-right', duration: 2000 })
    }
  }

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
        Welcome back! Please enter your credentials
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          autoComplete="email"
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
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
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
            pattern: /^[^\s]+$/,
          })}
        />
      </Box>

      <Button
        ref={buttonRef}
        type='submit'
        size='large'
        variant="contained"
        startIcon={<LoginOutlined />}
        fullWidth
        sx={{
          py: { xs: 1.25, sm: 1.5, md: 1.5 },
          fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: { xs: 1, md: 1.5 },
          backgroundColor: 'primary.main',
          color: '#060d17',
          borderRadius: 2,
          mt: 1,
          boxShadow: '0 10px 30px rgba(253, 224, 211, 0.3)',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Log In
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
            fontSize: '0.8125rem',
          }}
        >
          Don't have an account?{' '}
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
              fontSize: '0.8125rem',
              transition: 'color 0.15s ease',
              '&:hover': {
                color: 'primary.light',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              },
            }}
          >
            Create Account
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login