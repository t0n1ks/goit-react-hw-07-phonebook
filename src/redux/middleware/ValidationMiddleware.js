export const validateContactMiddleware = (store) => (next) => (action) => {
   
  if (action.type === "contacts/addContact") {
    
    const { payload } = action;
    
    if (payload.name === '' || payload.number === '') {
      alert('Please fill in all fields');
      return;
    }

    const currentState = store.getState();

    const isNameExists = currentState.contacts.items.some(contact => contact.name === payload.name);
    if (isNameExists) {
      alert(`${payload.name} already in the contact list!`);
      return;
    }

    const isNumberExists = currentState.contacts.items.some(contact => contact.number === payload.number);
    if (isNumberExists) {
      alert(`${payload.number} already in the contact list!`);
      return;
    }
  }

 
  return next(action);
};
