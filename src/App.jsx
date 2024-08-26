import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserMenu from './components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            isAuthenticated ? (
              <div>
                <UserMenu />{' '}
                <h1>Contacts</h1>
                <ContactForm />{' '}
                <Filter /> 
                <ContactList /> 
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />{' '}
      </Routes>
    </Router>
  );
};

export default App;
