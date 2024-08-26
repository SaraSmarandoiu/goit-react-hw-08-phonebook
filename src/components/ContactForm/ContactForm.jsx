import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../contactSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (name && phone) {
      dispatch(addContact({ name, phone }));
      setName('');
      setPhone('');
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
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className={styles.input}
        placeholder="Phone"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
