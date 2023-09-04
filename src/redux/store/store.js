import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, { fetchContacts } from '../contactsSlice/contactsSlice';
import { validateContactMiddleware } from '../../redux/middleware/ValidationMiddleware';

const rootReducer = {
  contacts: contactsReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(validateContactMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

store.dispatch(fetchContacts());

export default store;
