import { useSelector } from 'react-redux';
import style from './CollectionList.module.css';
import { selectCollections } from '../../../redux/collections/selectors';
import Card from './Card/Card';
import { Empty } from 'antd';

const CollectionList = () => {
  const items = useSelector(selectCollections);

  if (items.length === 0) {
    return <Empty />;
  }

  return (
    <ul className={style['list']}>
      {items.map(item => {
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
