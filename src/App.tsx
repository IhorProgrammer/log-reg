import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/reg" element={<RegistrationPage />} />
      <Route path="*" element={<>Log</>} />
      <Route path="/main" element={<>Main</>} />
    </Routes>
  );
}

export default App;
