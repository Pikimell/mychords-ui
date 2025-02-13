import { useSelector } from 'react-redux';
import style from './CollectionList.module.css';
import { selectCollections } from '../../../redux/collections/selectors';
import Card from './Card/Card';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const CollectionList = () => {
  const [params, setParams] = useSearchParams();
  const items = useSelector(selectCollections);
  const search = params.get('title');

  const filteredItems = useMemo(() => {
    return items.filter(el => {
      return el.title.toLowerCase().includes(search);
    });
  }, [items, search]);

  return (
    <ul className={style['list']}>
      <Card />
      {filteredItems.map(item => {
        return (
          <li key={item._id}>
            <Card item={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default CollectionList;
