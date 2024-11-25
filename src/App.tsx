import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/reg" element={<RegistrationPage />} />
      <Route path="*" element={<>Log</>} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
