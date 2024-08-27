import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, setFilter } from '../../contactsSlice';
import ContactItem from '../ContactItem/ContactItem';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <ContactForm />
      </div>
      <div className={styles.filter}>
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error loading contacts: {error}</p>}
      {filteredContacts.length === 0 && !isLoading ? (
        <p className={styles.noContacts}>No contacts found.</p>
      ) : (
        <ul className={styles.list}>
          {filteredContacts.map(contact => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDeleteContact={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
