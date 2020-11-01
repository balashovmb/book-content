import { connect } from 'react-redux';

import ChaptersList from './ChaptersList';
import { addChapter, addSection, toggleSection } from '../../redux/slices/chapters';

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (section) => !!section.completed,
  SHOW_UNCOMPLETED: (section) => !section.completed
}

const filterSections = (chapters, visibilityFilter) => (  
  chapters.entries.map((chapter) => (
    {
      ...chapter,
      sections: chapter.sections.filter(filters[visibilityFilter])
    })
  )
)

const mapStateToProps = (state) => ({
  chapters: filterSections(state.chapters, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
  addChapter: (title) => dispatch(addChapter(title)),
  toggleSection: (cIdx, sIdx) => dispatch(toggleSection({cIdx, sIdx})),
  addSection: (title, cIdx) => dispatch(addSection({title, cIdx})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
