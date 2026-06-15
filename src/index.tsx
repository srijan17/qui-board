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
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
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
