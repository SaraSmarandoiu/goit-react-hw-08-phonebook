import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global/'; 
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await axios.post(API_URL, newContact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const login = createAsyncThunk(
  'contacts/login',
  async (credentials, { dispatch }) => {
    const response = await axios.post(
      'https://connections-api.goit.global/api/login',
      credentials
    ); 
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    dispatch(setUser(user));

    return user;
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
    user: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('authToken');
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter, logout, setUser } = contactSlice.actions;
export default contactSlice.reducer;
