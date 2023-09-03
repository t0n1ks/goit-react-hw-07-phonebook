import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Імпортуємо Axios для HTTP-запитів

// Оголошуємо початковий стан
const initialState = {
  items: [],
  filter: '',
  isLoading: false, // Додаємо індикатор завантаження
  error: null, // Додаємо обробку помилок
};

// Оголошуємо операцію для отримання контактів з бекенду
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
        state.isLoading = true; // Увімкнути індикатор завантаження
        state.error = null; // Знищити попередню помилку, якщо є
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload; // Оновити список контактів
        state.isLoading = false; // Вимкнути індикатор завантаження
      })
      .addCase(fetchContacts.rejected, (state, { error }) => {
        state.isLoading = false; // Вимкнути індикатор завантаження
        state.error = error.message; // Зберегти повідомлення про помилку
      });
  },
});

export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
