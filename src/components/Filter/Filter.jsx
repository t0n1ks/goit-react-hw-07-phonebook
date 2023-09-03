import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../contactsSlice/contactsSlice';
import s from '../Filter/Filter.module/Filter.module.css';

// Оновлені імпорти для отримання контактів з бекенду
import { fetchContacts } from '../api/api'; // Залежно від вашої структури проекту та служби API

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    // Отримуємо контакти з бекенду при завантаженні компонента
    const fetchAndSetContacts = async () => {
      try {
        await fetchContacts(); // Відправляємо GET-запит до бекенду для отримання контактів
        // Ваш код для збереження контактів у стані Redux
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Обробка помилки при отриманні контактів з бекенду
      }
    };

    fetchAndSetContacts();
  }, [dispatch]);

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <label className={s.label}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        className={s.input}
      />
    </label>
  );
};

export default Filter;
