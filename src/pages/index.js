import { lazy } from 'react';

export default {
  Chords: lazy(() => import('./ChordsPage/ChordsPage')),
  Collections: lazy(() => import('./CollectionsPage/CollectionsPage')),
  CollectionItems: lazy(() => import('./ItemsPage/ItemsPage')),
  Create: lazy(() => import('./CreatePage/CreatePage')),
  Home: lazy(() => import('./HomePage/HomePage')),
  Search: lazy(() => import('./SearchPage/SearchPage')),
  Parse: lazy(() => import('./ParsePage/ParsePage')),
};
