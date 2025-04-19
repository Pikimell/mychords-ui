import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  items: [],
  previewItem: null,
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
    updateItem(state, { payload: chord }) {
      const index = state.items.findIndex(el => el._id === chord._id);

      if (index >= 0) {
        state.items[index] = chord;
      }
    },
    setPreviewItem(state, { payload: chords }) {
      state.previewItem = chords;
    },
    clearPreviewItem(state) {
      state.previewItem = null;
    },
  },
});

export const {
  setItems,
  addItem,
  removeItem,
  updateItem,
  setPreviewItem,
  clearPreviewItem,
} = sliceChords.actions;

const persistConfig = {
  key: 'chords',
  storage: storage,
};

export default persistReducer(persistConfig, sliceChords.reducer);
