import { useSelector } from 'react-redux';
import style from './Header.module.css';
import { selectMetaTitle } from '../../../redux/meta/selectors';
import { AiOutlineBars } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useModal } from '../../../hooks/useModal';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const title = useSelector(selectMetaTitle);
  const { modalState, openModal, closeModal } = useModal();

  return (
    <>
      <header className={style['header']}>
        {/* <button className={style['menu-btn']} onClick={openModal}>
          <AiOutlineBars />
        </button> */}
        <button className={style['menu-btn']} onClick={() => navigate('/')}>
          MyChords
        </button>
        <p>{title}</p>
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
