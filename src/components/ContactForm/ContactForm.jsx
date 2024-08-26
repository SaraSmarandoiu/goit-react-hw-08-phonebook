import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../contactsSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(''); 
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (name && number) {
      
      dispatch(addContact({ name, number })); 
      setName('');
      setNumber(''); 
    } else {
      console.error('Both name and number are required.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className={styles.input}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={number} 
        onChange={e => setNumber(e.target.value)} 
        className={styles.input}
        placeholder="Phone Number"
        required
      />
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
