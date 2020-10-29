import React from 'react';

import Button from '../Button';

const ChaptersList = ({ isLoading, chapters, addChapter, toggleSection, addSection }) => {
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {chapters && chapters.map((chapter, cIdx) => (
        <div key={cIdx}>
          <label className='block select-none font-bold'>
            <input type='checkbox'
              checked={chapter.completed}
              readOnly
            />
            {' '}
            {chapter.title}
          </label>
          <SectionsList chapter={chapter} toggleSection={toggleSection} cIdx={cIdx} addSection={addSection} />
        </div>
      ))}
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!e.target.title.value) return;
        addChapter(e.target.title.value);
        e.target.title.value = '';
      }} className='mt-1'>
        <input type='text' name='title' className='border rounded border-gray-400' />
        <Button className='ml-1'> Add chapter </Button>
      </form>
    </div>
  )
};

export default ChaptersList;

const SectionsList = ({ chapter, toggleSection, cIdx, addSection }) => {
  return (
    <div>
      {chapter.sections.map((section, sIdx) => (
        <label key={sIdx} className='block select-none ml-2'>
          <input onChange={() => toggleSection(cIdx, sIdx)}
            type='checkbox'
            checked={section.completed}
          />
          {' '}
          {section.title}
        </label>))
      }
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!e.target.title.value) return;
        addSection(e.target.title.value, cIdx);
        e.target.title.value = '';
      }}>
        <input type='text' name='title' className='border rounded border-gray-400' />
        <Button className='ml-1'> Add section </Button>
      </form>
    </div>
  )
}