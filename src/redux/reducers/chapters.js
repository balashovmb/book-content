const initialSection = { title: 'Section0', completed: false };
const initialState = [{ title: 'Intro', sections: [initialSection], completed: false }];
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
      return state.concat({ ...INITIAL_CHAPTER, title: action.title });
    case 'ADD_SECTION':
      return state.map((chapter, idx) => (
        idx === action.chapterIdx
          ? { ...chapter, sections: [...chapter.sections, { title: action.title, completed: false }], completed: false }
          : chapter
      ));
    case 'TOGGLE_SECTION':
      return state.map((chapter, cIdx) => (
        cIdx === action.chapterIdx
          ? mapChapter(chapter, action)
          : chapter
      ));
    default:
      return state;
  }
};

