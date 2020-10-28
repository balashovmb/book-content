import React from 'react';

const BookStatus = ({ chaptersCount, completedChaptersCount, sectionsCount, completedSectionsCount }) => {
  return (
    <div>
      <div>Number of chapters: {chaptersCount}</div>
      <div>Number of finished chapters: {completedChaptersCount}</div>
      <div>Number of sections: {sectionsCount}</div>
      <div>Number of finished sections: {completedSectionsCount}</div>
    </div>
  );
}

export default BookStatus;
