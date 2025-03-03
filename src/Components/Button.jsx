import React from 'react';

function Button({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition duration-300 ease-in-out"
    >
      {text}
    </button>
  );
}

export default Button;
