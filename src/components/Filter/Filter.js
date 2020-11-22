import React from 'react';

import Button from '../Button';

const Filter = ({ setFilter }) => {
  return (
    <div className='mt-2'>
      <Button onClick={() => { setFilter('SHOW_ALL') }} dataTestId='show-all-btn' >Show all</Button>
      <Button onClick={() => { setFilter('SHOW_COMPLETED') }} className="ml-1" dataTestId='show-completed-btn'>Show completed</Button>
      <Button onClick={() => { setFilter('SHOW_UNCOMPLETED') }} className="ml-1" dataTestId='show-uncompleted-btn'>Show uncompleted</Button>
    </div>
  );
}

export default Filter;
