import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCollections } from '../api/collections';
import { setCollections } from '../redux/collections/slice';

export const usePreload = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCollections({ perPage: 1000 }).then(data => {
      dispatch(setCollections(data.items));
    });
  }, [dispatch]);
};
