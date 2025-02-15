import { useNavigate } from 'react-router-dom';
import style from './Navigation.module.css';

const items = [
  { title: 'Головна', link: '/' },
  // { title: 'Пошук', link: '/search' },
  { title: 'Колекції', link: '/collections' },
  { title: 'Створити', link: '/create' },
];

const Navigation = ({ onClick = () => {}, showMainPage = true }) => {
  const navigate = useNavigate();

  const handleClick = link => {
    navigate(link);
    onClick();
  };

  return (
    <nav>
      <ul className={style['menu']}>
        {items
          .filter((el, i) => {
            return i !== 0 || showMainPage;
          })
          .map((el, i) => {
            return (
              <li
                key={i}
                className={style['item']}
                onClick={() => handleClick(el.link)}
              >
                {el.title}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navigation;
