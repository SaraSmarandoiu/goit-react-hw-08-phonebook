import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../contactSlice';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      window.location.href = '/contacts';
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={styles.input}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={styles.input}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
