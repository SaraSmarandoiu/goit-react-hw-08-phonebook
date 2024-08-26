import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../contactSlice';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.contacts.user?.email);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <div className={styles.userMenu}>
      {userEmail && <p>{userEmail}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
