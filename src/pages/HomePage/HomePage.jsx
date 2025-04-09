import { useDispatch } from 'react-redux';
import Navigation from '../../components/sections/Navigation/Navigation';
import { setTitle } from '../../redux/meta/slice';
import style from './HomePage.module.css';
import { isAdminStatus } from '../../utils/initTelegram';
import { Button } from 'antd';

const HomePage = () => {
  const isAdmin = isAdminStatus();
  const dispatch = useDispatch();
  dispatch(setTitle('Головне меню'));
  // const handleAdminClick = () => {
  //   localStorage.setItem('isAdmin', 'true');
  // };
  const handleClear = () => {
    localStorage.clear();
    localStorage.setItem('isAdmin', true);
  };

  return (
    <div className={style['page']}>
      <Navigation showMainPage={false} />
      {/* <button onClick={handleAdminClick}>ADMIN</button> */}
      {isAdmin && <Button onClick={handleClear}>Clear Storage</Button>}
    </div>
  );
};

export default HomePage;
