import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, setFilter } from './contactSlice';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import Navigation from './components/Navigation/Navigation';
import UserMenu from './components/UserMenu/UserMenu';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const { items, filter, isLoading, error } = useSelector(
    state => state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    if (!filter) return items;
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <UserMenu />
      <Routes>
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <>
              <h1>Phonebook</h1>
              <ContactForm />
              <h2>Contacts</h2>
              <Filter value={filter} onChange={handleFilterChange} />
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              <ContactList contacts={getFilteredContacts()} />
            </>
          }
        />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </div>
  );
};

export default App;
