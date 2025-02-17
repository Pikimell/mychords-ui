import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  title: 'Головне меню',
};

export const sliceMeta = createSlice({
  name: 'Meta',
  initialState,
  reducers: {
    setTitle(state, { payload: userData }) {
      state.title = userData;
    },
  },
});

export const { setTitle } = sliceMeta.actions;
export default sliceMeta.reducer;
