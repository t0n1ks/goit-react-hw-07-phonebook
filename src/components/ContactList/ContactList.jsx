import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice/contactsSlice';
import s from './ContactList.module/ContactList.module.css'; 

import { deleteContact as deleteContactApi } from '../../api/api'; 

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async (id) => {
    try {
      await deleteContactApi(id);
      dispatch(deleteContact(id)); 
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <ul className={s.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={s.item}>
          <p className={s.text}>
            {contact.name}: {contact.number}
          </p>
          <button
            type="button"
            onClick={() => handleDeleteContact(contact.id)} 
            className={s.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
