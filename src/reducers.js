import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contactsReducer from './contactsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

export default rootReducer;
