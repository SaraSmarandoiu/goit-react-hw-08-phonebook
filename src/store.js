import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import contactsReducer from './contactsSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
