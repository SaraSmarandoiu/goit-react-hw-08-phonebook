import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../authSlice';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.user?.email);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.userMenu}>
      {userEmail && <p className={styles.email}>{userEmail}</p>}
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
