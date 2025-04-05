import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  items: [],
};

export const sliceCollections = createSlice({
  name: 'Collections',
  initialState,
  reducers: {
    setCollections(state, { payload: userData }) {
      state.items = userData;
    },
    create(state, { payload: userData }) {
      state.items.push(userData);
    },
    remove(state, { payload: collectionId }) {
      state.items = state.items.filter(el => {
        return el._id != collectionId;
      });
    },
    addToCollection(state, { payload: { collectionId, chordsId } }) {
      const collection = state.items.find(el => el._id == collectionId);
      if (collection) {
        collection.items.push(chordsId);
      }
    },
    removeFromCollection(state, { payload: { collectionId, chordsId } }) {
      const collection = state.items.find(el => el._id == collectionId);
      if (collection) {
        collection.items = collection.items.filter(
          item => item._id !== chordsId,
        );
      }
    },
    update(state, { payload: newCollection }) {
      const index = state.items.findIndex(el => el._id === newCollection._id);
      if (index >= 0) {
        state.items[index] = newCollection;
      }
    },
  },
});

export const {
  setCollections,
  create,
  remove,
  update,
  addToCollection,
  removeFromCollection,
} = sliceCollections.actions;

const persistConfig = {
  key: 'collections',
  storage: storage,
};

export default persistReducer(persistConfig, sliceCollections.reducer);
