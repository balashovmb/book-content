import { connect } from "react-redux";

import ChaptersList from "./ChaptersList";
import { addChapter, addSection, toggleSection, moveSection } from "../../redux/slices/chapters";
import { ActionCreators } from "redux-undo";

const filters = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: section => !!section.completed,
  SHOW_UNCOMPLETED: section => !section.completed
};

const filterSections = (chapters, visibilityFilter) =>
  chapters.present.entries.map(chapter => ({
    ...chapter,
    sections: chapter.sections.filter(filters[visibilityFilter])
  }));

const mapStateToProps = state => ({
  chapters: filterSections(state.chapters, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  addChapter: title => dispatch(addChapter(title)),
  toggleSection: (cIdx, sIdx) => dispatch(toggleSection({ cIdx, sIdx })),
  addSection: (title, cIdx) => dispatch(addSection({ title, cIdx })),
  undo: () => dispatch(ActionCreators.undo()),
  moveSection: (cIdx, oldIndex, newIndex) => dispatch(moveSection({cIdx, oldIndex, newIndex}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
