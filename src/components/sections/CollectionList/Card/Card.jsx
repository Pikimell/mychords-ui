import { useNavigate, useLocation } from 'react-router-dom';
import style from './Card.module.css';
import Button from '../../../custom/Button/Button';
import { Flex, Modal } from 'antd';
import { isAdminStatus } from '../../../../utils/initTelegram';
import { Card as CardItem } from 'antd';
import { removeCollection } from '../../../../api/collections';
import { useDispatch } from 'react-redux';
import { remove } from '../../../../redux/collections/slice';
import { useModal } from '../../../../hooks/useModal';
import EditItems from '../../EditItems/EditItems';

const Card = ({ item = { title: 'Усі пісні', _id: 'all' } }) => {
  const isMainCollection = item._id === 'all';
  const { modalState, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleRedirect = () => {
    navigate(`/collections/${item._id}`, { state: { from: location } });
  };
  const handleDelete = () => {
    removeCollection(item._id).then(() => {
      dispatch(remove(item._id));
    });
  };

  return (
    <CardItem title={item?.title} className={style['collection-item']}>
      <Flex vertical gap="small" justify="stretch">
        <Flex>
          <Button
            style={{ width: '100%' }}
            onClick={handleRedirect}
            type="primary"
          >
            Відкрити
          </Button>
          {isAdminStatus() && !isMainCollection && (
            <Button
              style={{ width: '100%' }}
              onClick={openModal}
              type="primary"
            >
              Змінити
            </Button>
          )}
        </Flex>

        {isAdminStatus() && !isMainCollection && (
          <Button onClick={handleDelete} type="primary">
            Видалити
          </Button>
        )}
      </Flex>
      <Modal open={modalState} onCancel={closeModal} footer={null}>
        <EditItems collectionId={item._id} />
      </Modal>
    </CardItem>
  );
};

export default Card;
