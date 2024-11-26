import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import HomePage from './Pages/HomePage/HomePage';
import AuthenticationPage from './Pages/AuthenticationPage/AuthenticationPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import DashboardPage from './Pages/DashboardPage/DashboardPage';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2", 
        contrastText: "#fff", 
      },
      secondary: {
        main: "#dc004e", 
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<>Log</>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
