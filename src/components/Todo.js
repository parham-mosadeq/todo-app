import React from 'react';
// *react icons

import { FaTimes, FaRegEdit } from 'react-icons/fa';

const Todo = ({ handleDone, handleRemove, handleEdit, id, inputs }) => {
  return (
    <div
      className='bg-blue-100 flex justify-between p-2 mt-10 rounded-md text-cyan-900'
      key={id}
    >
      <h2
        onDoubleClick={(e) => {
          handleDone(e);
        }}
      >
        <p className='capitalize text-teal-800 '>{inputs}</p>
      </h2>
      <div>
        <button className='p-1 text-red-700' onClick={() => handleRemove(id)}>
          <FaTimes />
        </button>
        <button className='pl-1 text-green-800' onClick={() => handleEdit(id)}>
          <FaRegEdit />
        </button>
      </div>
    </div>
  );
};

export default Todo;
