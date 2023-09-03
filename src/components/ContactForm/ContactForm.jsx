import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice/contactsSlice';
import s from './ContactForm.module/ContactForm.module.css';


import { createContact } from '../../api/api';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (name === '' || number === '') {
      alert('Please fill in all fields');
      return;
    }

    const isNameExists = contacts.some(contact => contact.name === name);
    if (isNameExists) {
      alert(`${name} already in the contact list!`);
      return;
    }

    const isNumberExists = contacts.some(contact => contact.number === number);
    if (isNumberExists) {
      alert(`${number} already in the contact list!`);
      return;
    }

    try {
     
      const addedContact = await createContact({ name, number }); 
      dispatch(addContact(addedContact)); 
      setName('');
      setNumber('');
    } catch (error) {
      console.error('Error adding contact:', error);

    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={s.input}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
