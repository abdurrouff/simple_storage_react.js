import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ store, deleteItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {store.map((item, index) => {
        const { id, title } = item;
        return (
          <article key={index} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
