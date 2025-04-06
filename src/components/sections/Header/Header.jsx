import { useSelector } from 'react-redux';
import style from './Header.module.css';
import { selectMetaTitle } from '../../../redux/meta/selectors';
import { AiOutlineBars } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useModal } from '../../../hooks/useModal';
import Navigation from '../Navigation/Navigation';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = useSelector(selectMetaTitle);
  const { modalState, openModal, closeModal } = useModal();

  const handleRedirect = () => {
    const from = location.state?.from?.pathname;
    if (from && from.includes('collections')) {
      navigate(from);
    }
  };
  return (
    <>
      <header className={style['header']}>
        {/* <button className={style['menu-btn']} onClick={openModal}>
          <AiOutlineBars />
        </button> */}
        <button className={style['menu-btn']} onClick={() => navigate('/')}>
          MyChords
        </button>
        <p onClick={handleRedirect} style={{ cursor: 'pointer' }}>
          {title}
        </p>
        <p></p>
      </header>
      {modalState && (
        <div
          className={style['modal']}
          onClick={e => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <button className={style['close-btn']} onClick={closeModal}>
            <AiOutlineClose />
          </button>
          <Navigation onClick={closeModal} />
        </div>
      )}
    </>
  );
};

export default Header;
