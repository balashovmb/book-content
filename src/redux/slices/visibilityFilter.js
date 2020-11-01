import { createSlice } from '@reduxjs/toolkit';

const initialState = 'SHOW_ALL';

const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    }
  }
})

export const { setFilter } = visibilityFilterSlice.actions;
export default visibilityFilterSlice.reducer;
