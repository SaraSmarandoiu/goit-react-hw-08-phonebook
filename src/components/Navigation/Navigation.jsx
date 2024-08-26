import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;
