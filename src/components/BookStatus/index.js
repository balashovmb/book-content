import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import BookStatus from './BookStatus';

const getChapters = (state) => state.chapters.entries;

const getChaptersCount = createSelector(
  [getChapters],
  (chapters) => chapters.length
)

const getCompletedChaptersCount = createSelector(
  [getChapters],
  (chapters) => chapters.filter((chapter) => chapter.completed).length
)

const completedSectionsOfChapterCount = (chapter) => (chapter.sections.filter(section => section.completed).length);

const getSectionsCount = createSelector(
  [getChapters],
  (chapters) => (chapters.reduce((sum, el) => sum + el.sections.length, 0))
)


const getCompletedSectionsCount = createSelector(
  [getChapters],
  (chapters) => (chapters.reduce((sum, el) => sum + completedSectionsOfChapterCount(el), 0))
);

const mapStateToProps = (state) => {
  const chaptersCount = getChaptersCount(state);
  if (chaptersCount === 0) return {
    chaptersCount, sectionsCount: 0, completedSectionsCount: 0, completedChaptersCount: 0, progress: 0
  };

  console.log(state.chapters)

  return {
    chaptersCount,
    completedChaptersCount: getCompletedChaptersCount(state),
    sectionsCount: getSectionsCount(state),
    completedSectionsCount: getCompletedSectionsCount(state),
  };
};

export default connect(mapStateToProps, null)(BookStatus);
