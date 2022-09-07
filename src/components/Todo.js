import React from 'react';
// *react icons

import { FaTimes, FaRegEdit } from 'react-icons/fa';

const Todo = ({ handleDone, handleRemove, handleEdit, id, inputs }) => {
  return (
    <div key={id}>
      <h2
        onDoubleClick={(e) => {
          handleDone(e);
        }}
      >
        {inputs}
      </h2>
      <div>
        <button onClick={() => handleRemove(id)}>
          <FaTimes />
        </button>
        <button onClick={() => handleEdit(inputs)}>
          <FaRegEdit />
        </button>
      </div>
    </div>
  );
};

export default Todo;
