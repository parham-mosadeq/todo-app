import React, { useState, useRef, useEffect } from 'react';
// *uuid
import { v4 as uuidv4 } from 'uuid';
// *Toaster
import { ToastContainer } from 'react-toastify';
// *functions
import {
  toasterSuccess,
  toasterWarning,
  toasterError,
  getLocalStorage,
} from '../services/functions';
// *Components
import Todo from './Todo';

const Todos = () => {
  const [inputs, setInputs] = useState('');
  const [id, setId] = useState('');
  const [todos, setTodos] = useState(getLocalStorage());
  const [edit, setEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleAddBtn = () => {
    if (inputs) {
      setId(uuidv4());
      setTodos([...todos, { id, inputs }]);
      setInputs('');
      toasterSuccess('Added', 'bottom-right');
    } else if (!inputs) {
      toasterError('Please enter a valid data type', 'top-right');
    }
    if (todos && isEditing) {
      setTodos(
        todos.map((item) => {
          if (item.id === edit) {
            toasterWarning('Edited', 'top-right');
            setIsEditing(false);
            return { ...item, inputs };
          }
          return item;
        })
      );
    }
  };

  const handleRemove = (id) => {
    const newItems = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newItems);
    toasterError('Removed', 'top-right');
  };

  const handleDone = (inputs) => {
    inputs.target.className = 'text-red';
    console.log(inputs.target.className);
  };

  const handleEdit = (id) => {
    inputRef.current.focus();
    const specificItem = todos.find((item) => item.id === id);
    setIsEditing(true);
    setEdit(id);
    setInputs(specificItem.inputs);
  };

  useEffect(() => {
    localStorage.setItem('todosItems', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>todo app</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBtn();
          }}
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='enter todos'
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
          />
          <button type='button' onClick={handleAddBtn}>
            {isEditing ? 'edit' : 'add'}
          </button>
        </form>

        {todos.map((item) => {
          const { id, inputs } = item;
          if (inputs) {
            return (
              <Todo
                key={id}
                id={id}
                inputs={inputs}
                handleRemove={handleRemove}
                handleDone={handleDone}
                handleEdit={handleEdit}
              />
            );
          } else {
            return inputs;
          }
        })}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Todos;
