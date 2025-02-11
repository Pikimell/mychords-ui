import { useNavigate } from 'react-router-dom';
import style from './Card.module.css';
import Button from '../../../custom/Button/Button';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/collections/${item._id}`);
  };

  return (
    <div className={style['card']}>
      <p className={style['title']}>{item.title}</p>
      <Button onClick={handleRedirect}>Переглянути</Button>
    </div>
  );
};

export default Card;
