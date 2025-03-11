import styles from '../AuthPage.module.css'
import { toast } from 'react-hot-toast'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';
import { Box, Button, createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SendIcon from '@mui/icons-material/Send';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login({ setShowLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { signIn, register, handleSubmit, errors,watch } = useGenericContext(authContext)
  const navigate: NavigateFunction = useNavigate()
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
      navigate('/')
    }
  }


  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 768,
        lg: 1024,
        xl: 1200,
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: '20px',
            color: '#e2eaec',
            backgroundColor: 'transparent',
            // width: '300px',
            '&:before': {
              borderBottom: '2px solid #525759',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #525759',
            },
            '&:after': {
              borderBottom: '2px solid #525759',
            },
            ['@media (max-width:450px)']: {
              width: '200px',
              fontSize: '15px'
            }
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#e2eaec',
            fontSize: '28px',
            transform: 'translate(0, 10px) scale(1)',
            '&.Mui-focused': {
              color: '#e2eaec',
            },
            '&.MuiInputLabel-shrink': {
              transform: 'translate(0, -20px) scale(0.85)',
            },
            ['@media (max-width:576px)']: {
              fontSize: '15px',
              '& + .MuiInput-root': {
                marginTop: '0px', // Elimina el margin-top cuando la pantalla es menor a 576px
              },
            },
            ['@media (max-width:450px)']: {
              transform: 'translate(0, 5px) scale(1)',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#525759',
            fontSize: '35px',
            marginRight: '15px',
            ['@media(max-width:576px)']: {
              fontSize: '25px'
            }
          }
        }
      }
    },
  });


  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <ThemeProvider theme={theme}>
          <div className={styles.inputs}>

            {/* EMAIL */}
            <Box sx={{ display: "flex", alignItems: "flex-end", width: { sm: '350px', md: '400px', lg: '100%' } }}>
              <AlternateEmailIcon />
              <TextField
                label="Email"
                variant="standard"
                autoComplete="off"
                style={{ width: "100%" }}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </Box>
            <p className={`${styles.messageError} ${errors.email ? styles.visible : ''}`}>
              {errors.email?.type === 'required' && 'Email is required'}
              {errors.email?.type === 'pattern' && 'Invalid email format'}
            </p>

            {/* PASSWORD */}
            <Box sx={{ display: "flex", alignItems: "flex-end", width: { sm: '350px', md: '400px', lg: '100%' } }}>
              <LockOutlinedIcon />
              <TextField
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: passwordValue && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }} />}
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

            <p className={`${styles.messageError} ${errors.password ? styles.visible : ''}`}>
              {errors.password?.type === 'required' && 'Password is required'}
              {errors.password?.type === 'pattern' && 'Password cannot contain spaces'}
            </p>
          </div>
        </ThemeProvider>
        <div className={styles.bottom}>

          <Button ref={buttonRef} type='submit' size='large' variant="contained" endIcon={<SendIcon
            sx={(theme) => ({
              fontSize: '20px !important', // Tamaño base
              [theme.breakpoints.up('sm')]: {
                fontSize: '30px !important', // Tamaño para pantallas medianas en adelante
              },
            })}
          />
          } sx={{
            backgroundColor: 'transparent',
            border: '1px solid #e2eaec',
            color: '#e2eaec',
            marginBottom: '0',
            width: { xs: '200px', sm: '250px', md: '300px', lg: '400px' },
            fontSize: { xs: '16px', sm: '25px' },
            fontWeight: '700',
            padding: { xs: '6px', sm: '15px 10px' },
            '&:hover': {
              backgroundColor: '#e2eaec',
              color: '#060d17'
            },
          }}>
            Log In
          </Button>

          <h1 className={styles.textRedirect}>Don't have an account? <button type='button' onClick={() => setShowLogin(false)}>Sign Up</button></h1>
        </div>
      </form>
    </>

  );
};

export default Login