import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../contactsSlice/contactsSlice';
import s from '../ContactList/ContactList.module/ContactList.module.css';

// Оновлені імпорти для видалення контакту
import { deleteContact as deleteContactApi } from '../api/api'; // Залежно від вашої структури проекту та служби API

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async (id) => {
    try {
      // Відправляємо DELETE-запит до бекенду для видалення контакту
      await deleteContactApi(id);
      dispatch(deleteContact(id)); // Викликаємо дію deleteContact при успішному видаленні з бекенду
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Обробка помилки при видаленні контакту
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
            onClick={() => handleDeleteContact(contact.id)} // Викликаємо функцію для видалення контакту
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
