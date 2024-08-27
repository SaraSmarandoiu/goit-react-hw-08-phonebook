import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(API_URL, newContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.delete(`${API_URL}/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
