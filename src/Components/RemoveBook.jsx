import React, { useContext } from 'react';
import { deleteInstance } from '../helpers/_crudHelper';
import { AlertContext } from '../providers/alertProvider';
import { ButtonStyles } from './styles/ButtonStyles';

export default function RemoveBook({ id, index, removeEntry }) {
  const { addMessage } = useContext(AlertContext);

  const removeBook = () => {
    deleteInstance(id);
    addMessage('Book Deleted');
    removeEntry(index);
  };

  return <ButtonStyles onClick={removeBook}>Remove</ButtonStyles>;
}
