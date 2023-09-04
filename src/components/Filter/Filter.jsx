import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { changeFilter } from '../../redux/contactsSlice/contactsSlice';

import s from './Filter.module/Filter.module.css'; 



const Filter = () => {

 const filter = useSelector(state => state.contacts.filter);

 const dispatch = useDispatch();



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