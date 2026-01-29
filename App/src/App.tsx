import './App.css'
import './index.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SharedPage from './pages/SharedPage';

function App() {

  return <div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/share/:id' element={<SharedPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </div>

}

export default App

