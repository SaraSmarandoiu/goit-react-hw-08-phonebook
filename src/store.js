import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contactsReducer from './contactsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Import explicit

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // doar auth va fi persistat
};

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Dezactivează verificarea de serializare dacă e necesar
    }).concat(thunk),
});

export const persistor = persistStore(store);
