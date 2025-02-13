import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};

export const sliceChords = createSlice({
  name: 'Chords',
  initialState,
  reducers: {
    setItems(state, { payload: userData }) {
      state.items = userData;
    },
    addItem(state, { payload: userData }) {
      state.items.push(userData);
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(el => {
        return el._id != id;
      });
    },
    updateItem(state, { payload: userData }) {},
  },
});

export const { setItems, addItem, removeItem, updateItem } =
  sliceChords.actions;
export default sliceChords.reducer;
