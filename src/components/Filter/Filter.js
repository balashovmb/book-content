import React from 'react';

import Button from '../Button';

const Filter = ({ setFilter }) => {
  return (
    <div className='mt-2'>
      <Button onClick={() => { setFilter('SHOW_ALL') }} >Show all</Button>
      <Button onClick={() => { setFilter('SHOW_COMPLETED') }} className="ml-1">Show completed</Button>
      <Button onClick={() => { setFilter('SHOW_UNCOMPLETED') }} className="ml-1">Show uncompleted</Button>
    </div>
  );
}

export default Filter;
