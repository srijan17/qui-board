import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E60CE',
    },
    secondary: {
      main: '#FF9F1C',
    },
    background: {
      default: '#F8F9FA',
    },
    success: {
      main: '#2EC4B6',
    },
  },
  typography: {
    fontFamily: "Comic Sans MS",
    h1: { fontFamily: "Comic Sans MS" },
    h2: { fontFamily: "Comic Sans MS" },
    h3: { fontFamily: "Comic Sans MS" },
    h4: { fontFamily: "Comic Sans MS" },
    h5: { fontFamily: "Comic Sans MS" },
    h6: { fontFamily: "Comic Sans MS" },
    button: { fontWeight: 800, letterSpacing: 0.3, textTransform: 'none' },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 3px 0 rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
