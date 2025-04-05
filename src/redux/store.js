import { configureStore } from '@reduxjs/toolkit';
import chordsReducer from './chords/slice';
import collectionsReducer from './collections/slice';
import metaReducer from './meta/slice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    chords: chordsReducer,
    collections: collectionsReducer,
    meta: metaReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
