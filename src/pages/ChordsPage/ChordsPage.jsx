import style from './ChordsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getChord, removeChord } from '../../api/chords';
import { Empty, Flex, Modal } from 'antd';
import { getUserId } from '../../utils/initTelegram';
import Button from '../../components/custom/Button/Button';
import ItemSelector from '../../components/custom/ItemSelector/ItemSelector';
import EditCollection from '../../components/sections/EditCollection/EditCollection';
import { useModal } from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/chords/slice';
import { updateHtmlChords } from '../../utils/notes';
import toast from 'react-hot-toast';
import { selectChords } from '../../redux/chords/selectors';
import { setTitle } from '../../redux/meta/slice';

const ChordsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectChords);
  const { id } = useParams();
  const [chord, setChord] = useState();
  const [tune, setTune] = useState(0);
  const isAmDm = chord?.link?.includes('amdm');
  const isOwner = chord?.userId == getUserId();
  const [chordsStatus, setChordsState] = useState(false);
  const { modalState, openModal, closeModal } = useModal();

  // useEffect(() => {
  //   if (chord) dispatch(setTitle(chord.title));
  // }, [chord, dispatch]);

  const handlePrevSong = useCallback(() => {
    let index = items.findIndex(el => el._id === id);
    index += index < 1 ? items.length : 0;
    index--;
    navigate(`/chords/${items[index]._id}`);
  }, [items, id, navigate]);

  const handleNextSong = useCallback(() => {
    let index = items.findIndex(el => el._id === id);
    index++;
    navigate(`/chords/${items[index % items.length]._id}`);
  }, [items, id, navigate]);

  const onKeyDown = useCallback(
    e => {
      if (e.code === 'BracketLeft') {
        setTune(tune - 1);
      } else if (e.code === 'BracketRight') {
        setTune(tune + 1);
      } else if (e.code === 'KeyP') {
        setTune(0);
      } else if (e.code === 'Comma') {
        handlePrevSong();
      } else if (e.code === 'Period') {
        handleNextSong();
      }
    },
    [tune, handleNextSong, handlePrevSong],
  );

  useEffect(() => {
    getChord(id).then(setChord);
    setTune(0);
  }, [id]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const content = useMemo(() => {
    if (!chordsStatus) {
      return updateHtmlChords(chord?.content, tune);
    } else {
      return chord?.content.replaceAll(/<span[^>]*>.*?<\/span>/gs, '');
    }
  }, [chord?.content, chordsStatus, tune]);

  const handleSelectItem = value => {
    navigate(`/chords/${value}`);
  };
  const handleEditClick = () => {
    navigate(`/create?id=${id}`);
  };
  const handleDelete = () => {
    removeChord(id).then(() => {
      dispatch(removeItem(id));
    });
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.toString());
    toast.success('Скопійовано');
  };

  if (!chord?._id) {
    return (
      <div className={style.emptyContainer}>
        <Empty />
      </div>
    );
  }

  return (
    <div className={style.page}>
      <Flex justify="center" align="center">
        <Button className={style['tune']} onClick={handlePrevSong}>
          {'<'}
        </Button>
        <ItemSelector setValue={handleSelectItem} />
        <Button className={style['tune']} onClick={handleNextSong}>
          {'>'}
        </Button>
      </Flex>

      <div className={style.chordsContainer}>
        <h2 className={style.title}>{chord.title}</h2>

        <pre
          className={style.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></pre>

        <hr />
        <div className={style['info']}>
          {chord.author && (
            <p className={style.author}>Автор: {chord.author}</p>
          )}
          {chord.link && (
            <p className={style.author}>
              Посилання: <a href={chord.link}>{isAmDm ? 'AmDm' : 'MyChords'}</a>
            </p>
          )}

          {chord.number && (
            <p className={style.author}>Номер: {chord.number}</p>
          )}
          {chord.ton !== undefined && (
            <p className={style.author}>Тональность: {chord.ton}</p>
          )}

          {chord.description && (
            <p className={style.author}>{chord.description}</p>
          )}
        </div>
      </div>

      <div className={style['controls']}>
        <Flex align="center">
          <Button className={style['tune']} onClick={() => setTune(tune - 1)}>
            -1
          </Button>
          <p onClick={() => setTune(0)}>тон({tune})</p>
          <Button className={style['tune']} onClick={() => setTune(tune + 1)}>
            +1
          </Button>
        </Flex>
        {isOwner && (
          <Button className={style['btn']} onClick={handleEditClick}>
            Змінити
          </Button>
        )}
        {isOwner && (
          <Button className={style['btn']} onClick={openModal}>
            Колекції
          </Button>
        )}
        {chord.link && (
          <Button className={style['btn']} onClick={handleCopyLink}>
            Посилання
          </Button>
        )}
        <Button
          className={style['btn']}
          onClick={() => setChordsState(!chordsStatus)}
        >
          {chordsStatus ? 'Показати' : 'Приховати'} аккорди
        </Button>
        {isOwner && (
          <Button className={style['btn']} onClick={handleDelete}>
            Видалити
          </Button>
        )}
      </div>

      <Modal
        className={style['modal']}
        open={modalState}
        footer={null}
        onClose={closeModal}
        onCancel={closeModal}
      >
        <EditCollection chordId={id} />
      </Modal>
    </div>
  );
};

export default ChordsPage;
