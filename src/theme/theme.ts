import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FDE0D3',
      light: '#FFE9DD',
      dark: '#ECC5B3',
      contrastText: '#060d17',
    },
    secondary: {
      main: '#e2eaec',
      light: '#f5f7f8',
      dark: '#b8c5c9',
      contrastText: '#060d17',
    },
    background: {
      default: '#060d17',
      paper: '#0a1420',
    },
    text: {
      primary: '#e2eaec',
      secondary: '#b8c5c9',
    },
    error: {
      main: '#ff3e26',
    },
    warning: {
      main: '#ffc226',
    },
    success: {
      main: '#26ff3e',
    },
  },
  typography: {
    fontFamily: '"Lexend", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#FDE0D3',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#FDE0D3',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0a1420',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
