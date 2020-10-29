import { connect } from 'react-redux';

import ChaptersList from './ChaptersList';

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (section) => !!section.completed,
  SHOW_UNCOMPLETED: (section) => !section.completed
}

const filterSections = (chapters, visibilityFilter) => (
  chapters.map((chapter) => (
    {
      ...chapter,
      sections: chapter.sections.filter(filters[visibilityFilter])
    })
  )
)

const mapStateToProps = (state) => ({
  isLoading: state.chapters.isLoading,
  chapters: filterSections(state.chapters.entries, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
  addChapter: (title) => dispatch({
    type: 'ADD_CHAPTER',
    title
  }),
  toggleSection: (cIdx, sIdx) => dispatch({
    type: 'TOGGLE_SECTION',
    chapterIdx: cIdx,
    sectionIdx: sIdx
  }),
  addSection: (title, cIdx) => dispatch({
    type: 'ADD_SECTION',
    title,
    chapterIdx: cIdx,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
