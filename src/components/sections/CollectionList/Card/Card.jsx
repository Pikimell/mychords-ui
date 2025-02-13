import { useNavigate } from 'react-router-dom';
import style from './Card.module.css';
import Button from '../../../custom/Button/Button';
import { Flex } from 'antd';
import { isAdminStatus } from '../../../../utils/initTelegram';
import { Card as CardItem } from 'antd';
import { removeCollection } from '../../../../api/collections';
import { useDispatch } from 'react-redux';
import { remove } from '../../../../redux/collections/slice';

const Card = ({ item = { title: 'Усі пісні', _id: 'all' } }) => {
  const isMainCollection = item._id === 'all';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/collections/${item._id}`);
  };
  const handleDelete = () => {
    removeCollection(item._id).then(() => {
      dispatch(remove(item._id));
    });
  };

  return (
    <CardItem title={item?.title} className={style['collection-item']}>
      <Flex vertical gap="small" justify="stretch">
        <Button onClick={handleRedirect} type="primary">
          Відкрити
        </Button>
        {isAdminStatus() && !isMainCollection && (
          <Button onClick={handleDelete} type="primary">
            Видалити
          </Button>
        )}
      </Flex>
    </CardItem>
  );
};

export default Card;
