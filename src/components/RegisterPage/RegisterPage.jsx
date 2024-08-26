import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); 
    setSuccess(null);

    try {
      const response = await axios.post(
        'https://connections-api.goit.global/users/signup',
        {
          name,
          email,
          password,
        }
      );
      setSuccess('User registered successfully!');
      console.log('User registered', response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        setError('This email or username is already taken.');
      } else {
        setError('Failed to register. Please try again.');
      }
      console.error(
        'Failed to register:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        className={styles.input}
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button} disabled={!!success}>
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
