import { toast } from 'react-hot-toast'
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LockOutlined, AlternateEmail, Send, Visibility, VisibilityOff } from '@mui/icons-material';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                <AlternateEmail />
              </InputAdornment>
            ),
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
          error={!!errors.password}
          helperText={
            errors.password?.type === 'required' ? 'Password is required' :
              errors.password?.type === 'pattern' ? 'Password cannot contain spaces' : ''
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: passwordValue && (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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
        endIcon={<Send />}
        fullWidth
        sx={{
          py: 1.5,
          fontSize: { xs: '1rem', sm: '1.25rem' },
          fontWeight: 700,
        }}
      >
        Log In
      </Button>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: 'text.primary',
          fontSize: { xs: '0.875rem', sm: '1rem' },
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
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            '&:hover': {
              color: 'primary.light',
            },
          }}
        >
          Sign Up
        </Box>
      </Typography>
    </Box>
  );
};

export default Login