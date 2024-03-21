import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/parts/navbar';
import sendAPIRequest from './components/api/sendAPIrequest';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

const IsLogged = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth/login');
        } else {
          const res = await sendAPIRequest('GET', '/api/v1/authControl');
          if (res.code !== 200) {
            console.log("Giriş başarısız");
            navigate('/auth/login');
          } else {
            console.log("Giriş başarılı");
          }
        }
      } catch (err) {
        navigate('/auth/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return null;
};

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={
        <>
          <Title title="Muhammed Kuruyemiş - Anasayfa" />
          <IsLogged />
          <Navbar />
          <Dashboard />
        </>
      } />
      <Route path='/auth/login' element={
        <>
          <Title title="Muhammed Kuruyemiş - Giriş" />
          <Login />
        </>
      } />
      <Route path='/auth/register' element={
        <>
          <Title title="Muhammed Kuruyemiş - Kayıt Ol" />
          <Register />
        </>
      } />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
