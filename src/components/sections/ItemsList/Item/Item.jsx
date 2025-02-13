import { Flex, Modal } from 'antd';
import style from './Item.module.css';

import { isAdminStatus } from '../../../../utils/initTelegram';
import { useNavigate } from 'react-router-dom';
import { removeChord } from '../../../../api/chords';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../../redux/chords/slice';
const { confirm } = Modal;

const Item = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = isAdminStatus();
  const { number, title, author } = data;
  const numStr = number ? `${number} -` : '';
  const authorStr = author ? `${author} - ` : '';

  const handleRedirect = () => {
    navigate(`/chords/${data._id}`);
  };

  const handleRemove = () => {
    confirm({
      title: 'Видалити?',
      onOk() {
        removeChord(data._id).then(() => {
          dispatch(removeItem(data._id));
        });
      },
    });
  };

  return (
    <div className={style.itemContainer}>
      <p className={style.itemText}>
        {numStr}
        {authorStr}
        {title}
      </p>
      <Flex gap="5px">
        <button className={style.button} onClick={handleRedirect}>
          Відкрити
        </button>
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
