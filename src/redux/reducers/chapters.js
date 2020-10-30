import * as chaptersActions from '../actionTypes/chapters';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  entries: []
};
const INITIAL_CHAPTER = { sections: [], completed: false };

const mapChapter = (chapter, action) => {
  const newChapter = {
    ...chapter,
    sections: chapter.sections.map((section, sIdx) => (
      sIdx === action.sectionIdx
        ? { ...section, completed: !section.completed }
        : section)),
  }
  newChapter.completed = newChapter.sections.length === newChapter.sections.filter(section => section.completed).length;
  return newChapter;
}

export const chapters = function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHAPTER':
      return { ...state, entries: state.entries.concat({ ...INITIAL_CHAPTER, title: action.title }) };
    case 'ADD_SECTION':
      return {
        ...state,
        entries: state.entries.map((chapter, idx) => (
          idx === action.chapterIdx
            ? { ...chapter, sections: [...chapter.sections, { title: action.title, completed: false }], completed: false }
            : chapter
        ))
      };
    case 'TOGGLE_SECTION':
      return {
        ...state,
        entries: state.entries.map((chapter, cIdx) => (
          cIdx === action.chapterIdx
            ? mapChapter(chapter, action)
            : chapter
        ))
      };
    case chaptersActions.FETCH_CHAPTERS_REQUEST:
      return {
        ...initialState,
        isLoading: true
      };

    case chaptersActions.FETCH_CHAPTERS_SUCCESS:
      return {
        ...initialState,
        entries: action.response[0].structure
      };

    case chaptersActions.FETCH_CHAPTERS_FAILURE:
      return {
        ...state,
        isError: true,
        error: action.error
      }

    default:
      return state;
  }
};

