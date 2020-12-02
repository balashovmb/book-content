import React from 'react';

import Button from '../Button';

const ChaptersList = ({ undo, chapters, addChapter, toggleSection, addSection }) => {
  return (
    <div>
      {chapters && chapters.map((chapter, cIdx) => (
        <Chapter key={cIdx} cIdx={cIdx} chapter={chapter} toggleSection={toggleSection} addSection={addSection}>
          {chapter.title}
        </Chapter>
      ))}
      <ChapterForm addChapter={addChapter} />
      <Button onClick={() => { undo() }} className='mt-4'>Undo</Button>
    </div>
  )
};

export default ChaptersList;

const ChapterForm = ({ addChapter }) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    if (!e.target.elements.title.value) return;
    addChapter(e.target.elements.title.value);
    e.target.elements.title.value = '';
  }} className='mt-1'>
    <input type='text' name='title' className='border rounded border-gray-400' data-testid={`new-chapter-input`} />
    <Button className='ml-1' dataTestId={`new-chapter-submit`}> Add chapter </Button>
  </form>
)

const Chapter = ({ chapter, cIdx, toggleSection, addSection }) => (
  <div>
    <label className='block select-none font-bold' data-testid={`chapter-${cIdx}-title`}>
      <input type='checkbox'
        checked={chapter.completed}
        readOnly
        data-testid={`chapter-${cIdx}-completed`}
        className='mr-1'
      />
      {chapter.title}
    </label>
    <SectionsList chapter={chapter} toggleSection={toggleSection} cIdx={cIdx} addSection={addSection} />
  </div>
)

const SectionsList = ({ chapter, toggleSection, cIdx, addSection }) => {
  return (
    <div>
      {chapter.sections.map((section, sIdx) => (
        <Section key={sIdx} cIdx={cIdx} sIdx={sIdx} completed={section.completed} toggleSection={toggleSection}>
          {section.title}
        </Section>
      ))}
      <SectionForm addSection={addSection} cIdx={cIdx} />
    </div>
  )
}

const SectionForm = ({ addSection, cIdx }) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    if (!e.target.elements.title.value) return;
    addSection(e.target.elements.title.value, cIdx);
    e.target.elements.title.value = '';
  }}>
    <input type='text'
      name='title'
      className='border rounded border-gray-400'
      data-testid={`chapter-${cIdx}-new-section-input`}
    />
    <Button className='ml-1' dataTestId={`chapter-${cIdx}-new-section-submit`}> Add section </Button>
  </form>
)

const Section = ({ children, cIdx, sIdx, completed, toggleSection }) => (
  <label className='block select-none ml-2' data-testid={`section-${cIdx}.${sIdx}-title`}>
    <input onChange={() => toggleSection(cIdx, sIdx)}
      type='checkbox'
      data-testid={`section-${cIdx}.${sIdx}-completed`}
      checked={completed}
      className='mr-1'
    />
    {children}
  </label>
)
