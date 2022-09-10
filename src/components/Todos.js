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

  // ! setting item each time todo changes
  useEffect(() => {
    localStorage.setItem('todosItems', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='round-lg bg-neutral-800 min-w-full min-h-screen'>
      <div className='flex justify-center items-center p-4 flex-col'>
        <h1 className='text-3xl text-cyan-300 tracking-widest font-light text-black uppercase mt-5 mb-5'>
          todo app
        </h1>
        <div>
          <form
            className=''
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBtn();
            }}
          >
            <input
              className='capitalize text-center p-1 outline-offset-0 rounded-xl  '
              ref={inputRef}
              type='text'
              placeholder='enter todos'
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
            />
            <button
              className='text-blue-600 m-3 p-1 rounded-md bg-blue-200 font-3 tracking-wider uppercase'
              type='button'
              onClick={handleAddBtn}
            >
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
    </div>
  );
};

export default Todos;
