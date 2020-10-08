import React from 'react';

const Button = ({ children, className, onClick }) => (
  <button className={`border ${className} border-2 border-gray-400 rounded pl-1 pr-1`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
