import { createSlice } from '@reduxjs/toolkit';

const initialSection = { title: 'Section0', completed: false };
const initialState = [{ title: 'Intro', sections: [initialSection], completed: false }];
const INITIAL_CHAPTER = { sections: [], completed: false };

const mapChapter = (chapter, action) => {
  const newChapter = {
    ...chapter,
    sections: chapter.sections.map((section, sIdx) => (
      sIdx === action.payload.sIdx
        ? { ...section, completed: !section.completed }
        : section)),
  }
  newChapter.completed = newChapter.sections.length === newChapter.sections.filter(section => section.completed).length;
  return newChapter;
}


const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    addChapter(state, action) {
      return state.concat({ ...INITIAL_CHAPTER, title: action.payload });
    },
    addSection(state, action) {
      return state.map((chapter, idx) => (
        idx === action.payload.cIdx
          ? { ...chapter, sections: [...chapter.sections, { title: action.payload.title, completed: false }], completed: false }
          : chapter
      ));
    },
    toggleSection(state, action) {
      return state.map((chapter, cIdx) => (
        cIdx === action.payload.cIdx
          ? mapChapter(chapter, action)
          : chapter
      ));
    }
  }
})

export const { addChapter, addSection, toggleSection } = chaptersSlice.actions;
export default chaptersSlice.reducer;
