import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function getLocalStorage() {
  let store = JSON.parse(localStorage.getItem('store'));
  if (store) {
    return store;
  } else {
    return [];
  }
}

function App() {
  const [input, setInput] = useState('');
  const [store, setStore] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      setAlert({ show: true, msg: `fields can't be empty`, type: 'danger' });
    } else if (input && isEditing) {
      setStore(
        store.map((item) => {
          if (item.id === editID) {
            return { ...item, title: input };
          }
          return item;
        })
      );
      setAlert({
        show: true,
        msg: 'your item has been edited',
        type: 'success',
      });
      setInput('');
      setEditID(null);
      setIsEditing(false);
    } else {
      const newInputs = { id: new Date().getTime().toString(), title: input };
      setStore([...store, newInputs]);
      setInput('');
      setAlert({ show: true, msg: `item has been added`, type: 'success' });
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(true);
    }, 3000);
    return () => setTimeout(timeout);
  }, [store]);
  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  const clearStore = () => {
    setStore([]);
    setAlert({ show: true, msg: 'store has been cleared', type: 'danger' });
  };

  const deleteItem = (id) => {
    const removeItem = store.filter((item) => id !== item.id);
    setStore(removeItem);
    setAlert({ show: true, msg: 'item has been removed', type: 'danger' });
  };
  const editItem = (id) => {
    const specificItem = store.find((item) => id === item.id);
    setIsEditing(true);
    setEditID(id);
    setInput(specificItem.title);
  };
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Simple Storage</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'Edit' : 'submit'}
          </button>
        </div>
      </form>
      {store.length > 0 && (
        <div className='grocery-container'>
          <List store={store} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearStore}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
