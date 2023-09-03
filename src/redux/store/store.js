import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, { fetchContacts } from '../contactsSlice/contactsSlice'; 
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import {validateContactMiddleware} from '../../redux/middleware/ValidationMiddleware'

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
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(
    {serializableCheck: false,})
    .concat(validateContactMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);


store.dispatch(fetchContacts());

export default store;
