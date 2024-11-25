import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import HomePage from './Pages/HomePage/HomePage';
import AuthenticationPage from './Pages/AuthenticationPage/AuthenticationPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="*" element={<>Log</>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
