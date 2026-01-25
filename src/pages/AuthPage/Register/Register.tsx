import { toast } from 'react-hot-toast'
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';
import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { LockOutlined, AlternateEmail, Send, AssignmentIndOutlined, CakeOutlined } from '@mui/icons-material';

function Register({ setShowLogin }: { setShowLogin: () => void }) {

  const { signUp, register, handleSubmit, errors } = useGenericContext(authContext)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                <AssignmentIndOutlined />
              </InputAdornment>
            ),
          }}
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9\\s]+$/,
          })}
        />

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
                <CakeOutlined />
              </InputAdornment>
            ),
          }}
          {...register('age', { required: true })}
        />

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
            pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
          })}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
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
        endIcon={<Send />}
        fullWidth
        disabled={isSubmitting}
        sx={{
          py: 1.5,
          fontSize: { xs: '1rem', sm: '1.25rem' },
          fontWeight: 700,
        }}
      >
        Sign Up
      </Button>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: 'text.primary',
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        Do you have an account?{' '}
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
          Log In
        </Box>
      </Typography>
    </Box>
  );
};

export default Register