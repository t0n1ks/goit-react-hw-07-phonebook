// api.js

import axios from 'axios';

const BASE_URL = 'https://64f4b952932537f4051aa365.mockapi.io/api'; // URL вашого API

export const fetchContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createContact = async (contact) => {
    try {
      const response = await axios.post(`${BASE_URL}/contacts`, contact);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
   
export const addContact = async (contact) => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    await axios.delete(`${BASE_URL}/contacts/${contactId}`);
  } catch (error) {
    throw error;
  }
};
