import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ContactList from './components/ContactList/ContactList';
import Navigation from './components/Navigation/Navigation';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserMenu from './components/UserMenu/UserMenu';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/contacts');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Navigation />
      {isAuthenticated && <UserMenu />}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
