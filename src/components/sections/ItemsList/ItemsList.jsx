import { useParams, useSearchParams } from 'react-router-dom';
import style from './ItemsList.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChords } from '../../../redux/chords/selectors';
import Item from './Item/Item';
import { getChords, removeChord } from '../../../api/chords';
import { setItems } from '../../../redux/chords/slice';
import { Empty, Input } from 'antd';

const ItemsList = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { id } = useParams();
  const [pagination, setPagination] = useState({});
  const items = useSelector(selectChords);
  const page = params.page || 1;
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setItems([]));
    const collectionId = id !== 'all' ? id : undefined;
    getChords({ page, collectionId, perPage: 999999 }).then(data => {
      const { items, ...pagination } = data;
      setPagination({ ...pagination });
      dispatch(
        setItems(
          items.toSorted((a, b) => {
            return a.title.localeCompare(b.title);
          }),
        ),
      );
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

  if (!items.length) {
    return (
      <div className={style.section}>
        <Empty style={{ transform: 'scale(1.5)', marginTop: '100px' }} />
      </div>
    );
  }

  return (
    <div className={style.section}>
      <Input
        type="text"
        className={style.searchInput}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Шукати"
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
