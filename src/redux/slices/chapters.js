import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '5f998fb4231ba42851b49eaf';
const BASE_URL = 'https://bookcontent-534e.restdb.io/rest/chapters';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  entries: [],
  needUpload: false,
};
const INITIAL_CHAPTER = { sections: [], completed: false };

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async() => {
    const response = await axios({
      method: 'GET',
      url: BASE_URL,
      headers: {
        "x-apikey": API_KEY
      }
    })
  return response.data[0].structure;
  }
)

export const uploadChapters = createAsyncThunk(
  'chapters/uploadAll',
  async(structure) => {
    const response = await axios({
      method: 'PUT',
      url: `${BASE_URL}/5f998df488dd9b7f00002f79`,
      headers: {
        "x-apikey": API_KEY
      },
      data: {'structure': JSON.stringify(structure) }
    })
    console.log(response.statusText)
  return response.statusText;
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
        entries: state.entries.concat({ ...INITIAL_CHAPTER, title: action.payload }),
        needUpload: true
      }
    },
    addSection(state, action) {
      return {
          ...state,
          entries: state.entries.map((chapter, idx) => (
          idx === action.payload.cIdx
            ? { ...chapter, sections: [...chapter.sections, { title: action.payload.title, completed: false }], completed: false }
            : chapter
        )),
        needUpload: true
      }
    },
    toggleSection(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, cIdx) => (
          cIdx === action.payload.cIdx
            ? mapChapter(chapter, action)
            : chapter
       )),
       needUpload: true
      }
    },
  },
  extraReducers: {
    [fetchChapters.pending]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [fetchChapters.fulfilled]: (state, action) => ({
      ...initialState,
      entries: action.payload
    }),
    [uploadChapters.pending]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [uploadChapters.fulfilled]: (state, action) => ({
      ...state,
      needUpload: false
    }),
    [uploadChapters.rejected]: (state, action) => ({
      ...state,
      error: action.payload.state
    })
  }
});

export const { addChapter, addSection, toggleSection } = chaptersSlice.actions;
export default chaptersSlice.reducer;
