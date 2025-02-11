import Navigation from '../../components/sections/Navigation/Navigation';
import style from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={style['page']}>
      <Navigation showMainPage={false} />
    </div>
  );
};

export default HomePage;
