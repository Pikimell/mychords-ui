import { AiOutlinePlusCircle } from 'react-icons/ai';
import Button from '../../custom/Button/Button';
import style from './EditItems.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getChords, updateChord } from '../../../api/chords';
import { getUserId } from '../../../utils/initTelegram';

const EditItems = ({ collectionId }) => {
  const [items, setItems] = useState([]);
  const userId = getUserId();
  useEffect(() => {
    getChords({ perPage: 100000, userId }).then(data => {
      const { items } = data;
      setItems(items);
    });
  }, [userId]);

  const filtered = useMemo(() => {
    return items.filter(el => {
      return !el?.collections?.includes(collectionId);
    });
  }, [items, collectionId]);

  const handleAdd = id => {
    const arr = [...items];
    const index = arr.findIndex(el => el._id === id);
    arr[index].collections = arr[index].collections || [];
    arr[index].collections.push(collectionId);
    updateChord(id, arr[index]);
    setItems(arr);
  };

  return (
    <div className={style['edit-collection']}>
      {filtered.map(el => {
        return (
          <div key={el._id} className={style['item']}>
            <p>{el.title}</p>
            <Button onClick={() => handleAdd(el._id)}>
              <AiOutlinePlusCircle size="20px" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default EditItems;
