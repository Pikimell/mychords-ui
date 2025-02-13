import { useParams, useSearchParams } from 'react-router-dom';
import style from './ItemsList.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChords } from '../../../redux/chords/selectors';
import Item from './Item/Item';
import { getChords } from '../../../api/chords';
import { setItems } from '../../../redux/chords/slice';
import { Input } from 'antd';

const ItemsList = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { id } = useParams();
  const [pagination, setPagination] = useState({});
  const items = useSelector(selectChords);
  const page = params.page || 1;
  const [search, setSearch] = useState('');

  useEffect(() => {
    const collectionId = id !== 'all' ? id : undefined;
    getChords({ page, collectionId, perPage: 999999 }).then(data => {
      const { items, ...pagination } = data;
      setPagination({ ...pagination });
      dispatch(setItems(items));
    });
  }, [dispatch, page, id]);

  const filteredItems = useMemo(() => {
    return items.filter(el => {
      const value = search.toLowerCase();
      const hasTitle = el.title.toLowerCase().includes(value);
      const hasAuthor = el.author?.toLowerCase().includes(value);
      const hasNumber = el.number == value;
      const isValid = hasTitle || hasAuthor || hasNumber;
      return isValid;
    });
  }, [items, search]);

  return (
    <div className={style.section}>
      <Input
        type="text"
        className={style.searchInput}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className={style.list}>
        {filteredItems.map(item => {
          return <Item data={item} key={item._id} />;
        })}
      </ul>
    </div>
  );
};

export default ItemsList;
