import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import arrayMove from 'array-move';

const API_KEY = '5f998fb4231ba42851b49eaf';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  entries: []
};
const INITIAL_CHAPTER = { sections: [], completed: false };

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async() => {
    const response = await axios({
      method: 'GET',
      url: 'https://bookcontent-534e.restdb.io/rest/chapters',
      headers: {
        "x-apikey": API_KEY
      }
    })
  return response.data[0].structure;
  }
)

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
      return {
        ...state,
        entries: state.entries.concat({ ...INITIAL_CHAPTER, title: action.payload })
      }
    },
    addSection(state, action) {
      return {
          ...state,
          entries: state.entries.map((chapter, idx) => (
          idx === action.payload.cIdx
            ? { ...chapter, sections: [...chapter.sections, { title: action.payload.title, completed: false }], completed: false }
            : chapter
        ))
      }
    },
    toggleSection(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, cIdx) => (
          cIdx === action.payload.cIdx
            ? mapChapter(chapter, action)
            : chapter
       ))
      }
    },
    arrangeSection(state, action) {
      state.entries[action.payload.cIdx].sections =
        arrayMove(
          state.entries[action.payload.cIdx].sections,
          action.payload.oldIndex,
          action.payload.newIndex
        );
      return;
    },
    moveSection(state, action) {
      const newChapterIdx = action.payload.newCIdx;
      const oldChapterIdx = action.payload.oldCIdx;
      if (oldChapterIdx === newChapterIdx) return;
      const sectionIdx = action.payload.sIdx;
      const section = state.entries[oldChapterIdx].sections[sectionIdx];
      state.entries[oldChapterIdx].sections.splice(sectionIdx, 1);
      state.entries[newChapterIdx].sections = [...state.entries[newChapterIdx].sections, section]
    }
  },
  extraReducers: {
    [fetchChapters.pending]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [fetchChapters.fulfilled]: (state, action) => ({
      ...initialState,
      entries: action.payload
    })
  }
});

export const { addChapter, addSection, toggleSection, arrangeSection, moveSection } = chaptersSlice.actions;
export default chaptersSlice.reducer;
