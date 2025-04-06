import { useDispatch } from 'react-redux';
import Navigation from '../../components/sections/Navigation/Navigation';
import { setTitle } from '../../redux/meta/slice';
import style from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  dispatch(setTitle('Головне меню'));
  const handleAdminClick = () => {
    localStorage.setItem('isAdmin', 'true');
  };

  return (
    <div className={style['page']}>
      <Navigation showMainPage={false} />
      <button onClick={handleAdminClick}>ADMIN</button>
    </div>
  );
};

export default HomePage;
