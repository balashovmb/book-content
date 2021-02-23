import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '5f998fb4231ba42851b49eaf';
const BASE_URL = 'https://bookcontent-534e.restdb.io/rest/chapters';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "x-apikey": API_KEY
  },
});

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
    const response = await httpClient();
    return response.data[0].structure;
  }
)

export const syncChapters = createAsyncThunk(
  'chapters/uploadAll',
  async(structure) => {
    const response = httpClient({
      method: "PUT",
      url: "/5f998df488dd9b7f00002f79",
      data: { structure: JSON.stringify(structure) },
    });
  return response.statusText;
  }
)

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    addChapter(state, action) {
      state.entries.push({ ...INITIAL_CHAPTER, title: action.payload })
    },
    addSection(state, action) {
      const chapter = state.entries[action.payload.cIdx];
      chapter.sections.push({ title: action.payload.title, completed: false });
      chapter.completed = false;
    },
    toggleSection(state, action) {
      const chapter = state.entries[action.payload.cIdx];
      const section = chapter.sections[action.payload.sIdx];
      section.completed = !section.completed;
      chapter.completed = chapter.sections.length === chapter.sections.filter(section => section.completed).length;
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
    [syncChapters.pending]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [syncChapters.fulfilled]: (state, action) => ({
      ...state,
      needUpload: false
    }),
    [syncChapters.rejected]: (state, action) => ({
      ...state,
      error: action.payload.state
    })
  }
});

export const { addChapter, addSection, toggleSection } = chaptersSlice.actions;
export default chaptersSlice.reducer;
