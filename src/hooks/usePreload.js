import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCollections } from '../api/collections';
import { setCollections } from '../redux/collections/slice';
import { getUserId } from '../utils/initTelegram';

export const usePreload = () => {
  const dispatch = useDispatch();
  const userId = getUserId();

  useEffect(() => {
    getCollections({ perPage: 1000, userId }).then(data => {
      dispatch(setCollections(data.items));
    });
  }, [dispatch, userId]);
};
