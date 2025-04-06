import style from './ChordsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getChord, removeChord } from '../../api/chords';
import { Empty, Flex, Modal, Slider } from 'antd';
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
import html2canvas from 'html2canvas';

const ChordsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef();
  const items = useSelector(selectChords);
  const { id } = useParams();
  const [chord, setChord] = useState();
  const [tune, setTune] = useState(0);
  const isAmDm = chord?.link?.includes('amdm');
  const isOwner = chord?.userId == getUserId();
  const [chordsStatus, setChordsState] = useState(false);
  const { modalState, openModal, closeModal } = useModal();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const scrollInterval = useRef(null);

  useEffect(() => {
    getChord(id).then(setChord);
    setTune(0);
    setScrollSpeed(1);
    setIsScrolling(false);
    clearInterval(scrollInterval.current);
  }, [id]);

  const handlePrevSong = useCallback(() => {
    let index = items.findIndex(el => el._id === id);
    index = index < 1 ? items.length - 1 : index - 1;
    navigate(`/chords/${items[index]._id}`);
  }, [items, id, navigate]);

  const handleNextSong = useCallback(() => {
    let index = items.findIndex(el => el._id === id);
    navigate(`/chords/${items[(index + 1) % items.length]._id}`);
  }, [items, id, navigate]);

  const handleDelete = () => {
    removeChord(id).then(() => {
      dispatch(removeItem(id));
    });
  };

  const startScrolling = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  const stopScrolling = () => {
    setIsScrolling(false);
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  const toggleScrolling = () => {
    isScrolling ? stopScrolling() : startScrolling();
  };

  const onKeyDown = useCallback(
    e => {
      if (e.code === 'BracketLeft') {
        setTune(tune - 1);
      } else if (e.code === 'BracketRight') {
        setTune(tune + 1);
      } else if (e.code === 'KeyP') {
        setTune(0);
      } else if (['Comma', 'ArrowLeft'].includes(e.code)) {
        handlePrevSong();
      } else if (['Period', 'ArrowRight'].includes(e.code)) {
        handleNextSong();
      } else if (e.code === 'KeyE') {
        navigate(`/create?id=${id}`);
      }
    },
    [tune, handleNextSong, handlePrevSong, id, navigate],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const content = useMemo(() => {
    if (!chordsStatus) {
      return updateHtmlChords(chord?.content, tune);
    } else {
      let copy = chord?.content.replaceAll(/<span[^>]*>.*?<\/span>/gs, '');
      while (copy.includes('  ')) {
        copy = copy.replaceAll('  ', ' ');
        copy = copy.replaceAll('	 ', ' ');
        copy = copy.replaceAll('\n\n\n', '\n');
        copy = copy.replaceAll(/[|!;:[\]]*/gs, '');
      }
      return copy;
    }
  }, [chord?.content, chordsStatus, tune]);

  useEffect(() => {
    if (isScrolling) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }, Math.round(1000 / scrollSpeed));
    }
  }, [scrollSpeed, isScrolling, scrollInterval]);

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
        <ItemSelector setValue={value => navigate(`/chords/${value}`)} />
        <Button className={style['tune']} onClick={handleNextSong}>
          {'>'}
        </Button>
      </Flex>

      {!chordsStatus && (
        <Flex justify="center" vertical align="center">
          <Button className={style['btn']} onClick={toggleScrolling}>
            {isScrolling ? 'Зупинити' : 'Скрол'}
          </Button>
          <Slider
            style={{ width: '80%', maxWidth: '600px' }}
            min={0.8}
            max={30}
            step={0.1}
            value={scrollSpeed}
            onChange={v => setScrollSpeed(v)}
          />
        </Flex>
      )}

      <div ref={contentRef} className={style.chordsContainer}>
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
          <p onClick={() => setTune(0)}>Тон ({tune})</p>
          <Button className={style['tune']} onClick={() => setTune(tune + 1)}>
            +1
          </Button>
        </Flex>
        <Button className={style['btn']} onClick={toggleScrolling}>
          {isScrolling ? 'Зупинити' : 'Скрол'}
        </Button>
        <Button
          className={style['btn']}
          onClick={() => setChordsState(!chordsStatus)}
        >
          {chordsStatus ? 'Показати' : 'Приховати'} аккорди
        </Button>
        {isOwner && (
          <Button
            className={style['btn']}
            onClick={() => navigate(`/create?id=${id}`)}
          >
            Змінити
          </Button>
        )}

        <Button className={style['btn']} onClick={openModal}>
          Колекції
        </Button>

        {chord.link && (
          <Button
            className={style['btn']}
            onClick={() => {
              navigator.clipboard.writeText(window.location.toString());
              toast.success('Скопійовано');
            }}
          >
            Поділитись Посиланням
          </Button>
        )}
        {isOwner && (
          <Button className={style['btn']} onClick={handleDelete}>
            Видалити
          </Button>
        )}
        <Button
          className={style['btn']}
          onClick={async () => {
            if (!contentRef.current) return;
            const canvas = await html2canvas(contentRef.current);
            canvas.toBlob(blob => {
              if (blob) {
                navigator.clipboard
                  .write([new ClipboardItem({ 'image/png': blob })])
                  .then(() => {
                    toast.success('Скріншот скопійовано до буфера обміну!');
                  })
                  .catch(err => {
                    toast.error('Не вдалося скопіювати скріншот');
                    console.error(err);
                  });
              }
            });
          }}
        >
          📸 Скріншот
        </Button>
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
