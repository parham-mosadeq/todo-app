import React, { useState, useRef } from 'react';
// *uuid
import { v4 as uuidv4 } from 'uuid';

import Todo from './Todo';

const Todos = () => {
  const [inputs, setInputs] = useState('');
  const [id, setId] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState('');

  const inputRef = useRef(null);

  const handleAddBtn = () => {
    setId(uuidv4());
    setTodos([...todos, { id, inputs }]);
    setInputs('');
  };

  const handleRemove = (id) => {
    const newItems = todos.filter((item) => item.id !== id);
    setTodos(newItems);
  };

  const handleDone = (inputs) => {
    inputs.target.className = 'line-through';
    console.log(inputs.target.className);
  };

  const handleEdit = (e) => {
    inputRef.current.focus();
    setEdit(e);
    setInputs(`edited:${edit}`);
  };

  return (
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
          add
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
          return <div key={uuidv4()}></div>;
        }
      })}
    </div>
  );
};

export default Todos;