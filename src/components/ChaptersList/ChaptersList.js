import React from 'react';

import Button from '../Button';

const ChaptersList = ({undo, chapters, addChapter, toggleSection, addSection }) => {
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
        <input type='text' name='title' className='border rounded border-gray-400' data-testid={`new-chapter-input`}/>
        <Button className='ml-1' dataTestId={`new-chapter-submit`}> Add chapter </Button>
      </form>
      <Button onClick={()=> {undo()}} className='mt-4'>Undo</Button>
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
        <input type='text' name='title' className='border rounded border-gray-400' data-testid={`chapter-${cIdx}-new-section-input`}/>
        <Button className='ml-1' dataTestId={`chapter-${cIdx}-new-section-submit`}> Add section </Button>
      </form>
    </div>
  )
}