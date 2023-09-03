import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, changeFilter } from '../contactsSlice/contactsSlice';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import s from '../App/App.module/App.module.css';

// Оновлені імпорти для взаємодії з бекендом
import { createContact, deleteContact as deleteContactApi, fetchContacts } from '../api/api';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    // Отримуємо контакти з бекенду при завантаженні компонента
    const fetchAndSetContacts = async () => {
      try {
        await fetchContacts(); // Відправляємо GET-запит до бекенду для отримання контактів
        // Ваш код для збереження отриманих контактів у стані Redux
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Обробка помилки при отриманні контактів з бекенду
      }
    };

    fetchAndSetContacts();
  }, [dispatch]);

  const handleAddContact = async (contact) => {
    try {
      // Відправляємо POST-запит до бекенду для додавання контакту
      const addedContact = await createContact(contact); // Ваш код для відправки контакту на бекенд і отримання відповіді
      dispatch(addContact(addedContact)); // Викликаємо дію addContact при успішному додаванні на бекенді
    } catch (error) {
      console.error('Error adding contact:', error);
      // Обробка помилки при додаванні контакту на бекенді
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      // Відправляємо DELETE-запит до бекенду для видалення контакту
      await deleteContactApi(id); // Ваш код для видалення контакту на бекенді
      dispatch(deleteContact(id)); // Викликаємо дію deleteContact при успішному видаленні на бекенді
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Обробка помилки при видаленні контакту на бекенді
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
