import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, { fetchContacts } from '../contactsSlice/contactsSlice'; // Імпортуємо операцію fetchContacts з contactsSlice
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'; // Додаємо Redux Thunk для обробки асинхронних операцій

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const rootReducer = {
  contacts: persistReducer(persistConfig, contactsReducer),
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk], // Додаємо Redux Thunk
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

// Виконуємо операцію отримання контактів при ініціалізації додатку
store.dispatch(fetchContacts());

export default store;
