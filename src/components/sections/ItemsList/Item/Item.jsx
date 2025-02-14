import { Flex, Modal } from 'antd';
import style from './Item.module.css';

import { isAdminStatus } from '../../../../utils/initTelegram';
import { NavLink, useParams } from 'react-router-dom';
import { removeChord, updateChord } from '../../../../api/chords';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../../redux/chords/slice';
const { confirm } = Modal;

const Item = ({ data }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isAdmin = isAdminStatus();
  const { number, title, collections = [] } = data;
  const numStr = number ? `${number} -` : '';

  const handleRemove = () => {
    confirm({
      title: 'Видалити?',
      onOk() {
        if (id === 'all') {
          removeChord(data._id).then(() => {
            dispatch(removeItem(data._id));
          });
        } else {
          const arr = collections.filter(el => el != id);
          updateChord(data._id, { collections: arr }).then(() => {
            dispatch(removeItem(data._id));
          });
        }
      },
    });
  };

  return (
    <div className={style.itemContainer}>
      <p className={style.itemText}>
        {numStr}
        {title}
      </p>
      <Flex gap="5px">
        <NavLink className={style.button} to={`/chords/${data._id}`}>
          Відкрити
        </NavLink>
        {isAdmin && (
          <button className={style.buttonDelete} onClick={handleRemove}>
            Видалити
          </button>
        )}
      </Flex>
    </div>
  );
};

export default Item;
