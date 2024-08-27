import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ContactList from './components/ContactList/ContactList';
import Navigation from './components/Navigation/Navigation';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserMenu from './components/UserMenu/UserMenu'; 

const App = () => {
  return (
    <div>
      <Navigation />
      <UserMenu />{' '}
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
