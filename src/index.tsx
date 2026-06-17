import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f507a',
    },
    secondary: {
      main: '#FF9F1C',
    },
    success: {
      main: '#2EC4B6',
    },
  },
  typography: {
    fontFamily: "Helvetica",
    h1: { fontFamily: "Helvetica" },
    h2: { fontFamily: "Helvetica" },
    h3: { fontFamily: "Helvetica" },
    h4: { fontFamily: "Helvetica" },
    h5: { fontFamily: "Helvetica" },
    h6: { fontFamily: "Helvetica" },
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
