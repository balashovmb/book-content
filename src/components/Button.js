import React from 'react';

const Button = ({ children, className, onClick, dataTestId }) => (
  <button className={`border ${className} border-2 border-gray-400 rounded pl-1 pr-1`} onClick={onClick} data-testid={dataTestId}>
    {children}
  </button>
);

export default Button;
