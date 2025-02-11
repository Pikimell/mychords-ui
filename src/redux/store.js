import { configureStore } from '@reduxjs/toolkit';
import chordsReducer from './chords/slice';
import collectionsReducer from './collections/slice';
import metaReducer from './meta/slice';

export const store = configureStore({
  reducer: {
    chords: chordsReducer,
    collections: collectionsReducer,
    meta: metaReducer,
  },
});
