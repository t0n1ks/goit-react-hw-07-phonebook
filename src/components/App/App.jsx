import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, changeFilter } from '../contactsSlice/contactsSlice';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import s from '../App/App.module/App.module.css';


import { createContact, deleteContact as deleteContactApi, fetchContacts } from '../api/api';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
  
    const fetchAndSetContacts = async () => {
      try {
        await fetchContacts(); 
        
      } catch (error) {
        console.error('Error fetching contacts:', error);
        
      }
    };

    fetchAndSetContacts();
  }, [dispatch]);

  const handleAddContact = async (contact) => {
    try {
     
      const addedContact = await createContact(contact); 
      dispatch(addContact(addedContact)); 
    } catch (error) {
      console.error('Error adding contact:', error);
     
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      
      await deleteContactApi(id); 
      dispatch(deleteContact(id)); 
    } catch (error) {
      console.error('Error deleting contact:', error);
   
    }
  };

  const handleChangeFilter = (filterValue) => {
    dispatch(changeFilter(filterValue));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleChangeFilter} />
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
