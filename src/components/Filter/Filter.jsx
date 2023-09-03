import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/contactsSlice/contactsSlice';
import s from '../Filter/Filter.module/Filter.module.css';


import { fetchContacts } from '../../api/api'; 

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

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
