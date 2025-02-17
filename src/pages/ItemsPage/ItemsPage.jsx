import { useParams } from 'react-router-dom';
import ItemsList from '../../components/sections/ItemsList/ItemsList';
import style from './ItemsPage.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../redux/meta/slice';
import { getCollections } from '../../api/collections';

const ItemsPage = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id === 'all') {
      dispatch(setTitle('Усі пісні'));
    } else {
      getCollections({ perPage: 9999 }).then(({ items }) => {
        const item = items.find(el => el._id === id);
        dispatch(setTitle(item.title));
      });
    }
  });
  return (
    <div>
      <ItemsList />
    </div>
  );
};

export default ItemsPage;
