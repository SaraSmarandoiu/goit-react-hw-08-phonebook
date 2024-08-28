import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/contacts'); 
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>
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
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
