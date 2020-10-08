import { connect } from 'react-redux';

import BookStatus from './BookStatus';

const completedSectionsOfChapterCount = (chapter) => (chapter.sections.filter(section => section.completed).length);

const sectionsCount = (chapters) => {
  return chapters.reduce((sum, el) => sum + el.sections.length, 0)
}

const completedSectionsCount = (chapters) => {
  return chapters.reduce((sum, el) => sum + completedSectionsOfChapterCount(el), 0);
}

const mapStateToProps = (state) => {
  const chaptersCount = state.chapters.length;
  if (chaptersCount === 0) return {
    chaptersCount, sectionsCount: 0, completedSectionsCount: 0, completedChaptersCount: 0, progress: 0
  };

  const completedChaptersCount = state.chapters.filter((chapter) => chapter.completed).length;

  return {
    chaptersCount,
    completedChaptersCount,
    sectionsCount: sectionsCount(state.chapters),
    completedSectionsCount: completedSectionsCount(state.chapters),
  }
}

export default connect(mapStateToProps, null)(BookStatus);
