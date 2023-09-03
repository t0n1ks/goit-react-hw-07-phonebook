import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 


const initialState = {
  items: [],
  filter: '',
  isLoading: false, 
  error: null,
};


export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get('https://64f4b952932537f4051aa365.mockapi.io/api/contacts');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => ({
      ...state,
      items: [...state.items, payload],
    }),
    deleteContact: (state, { payload }) => ({
      ...state,
      items: state.items.filter(contact => contact.id !== payload),
    }),
    changeFilter: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload; 
        state.isLoading = false; 
      })
      .addCase(fetchContacts.rejected, (state, { error }) => {
        state.isLoading = false; 
        state.error = error.message; 
      });
  },
});

export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
