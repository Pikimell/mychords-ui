import style from './PreviewPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Empty, Flex, Slider } from 'antd';
import { getUserId } from '../../utils/initTelegram';
import Button from '../../components/custom/Button/Button';
import ItemSelector from '../../components/custom/ItemSelector/ItemSelector';

import { useDispatch, useSelector } from 'react-redux';

import { updateHtmlChords } from '../../utils/notes';
import toast from 'react-hot-toast';
import { selectChords, selectPreviewItem } from '../../redux/chords/selectors';
import html2canvas from 'html2canvas';
import { searchItem } from '../../api/mychords';
import { clearPreviewItem } from '../../redux/chords/slice';

const PreviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previewItem = useSelector(selectPreviewItem);
  const contentRef = useRef();
  const items = useSelector(selectChords);
  const [tune, setTune] = useState(0);
  const isAmDm = previewItem?.link?.includes('amdm');
  const isOwner = previewItem?.userId == getUserId();
  const [chordsStatus, setChordsState] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const scrollInterval = useRef(null);
  const [cords, setChords] = useState({});

  useEffect(() => {
    if (previewItem) {
      searchItem(previewItem.link).then(data => {
        setChords(data);
        dispatch(clearPreviewItem());
      });
    }
  }, [previewItem]);

  const handlePrevSong = useCallback(() => {
    navigate(`/chords/${items[0]._id}`);
  }, [items, navigate]);

  const handleNextSong = useCallback(() => {
    navigate(`/chords/${items[0]._id}`);
  }, [items, navigate]);

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
      }
    },
    [tune, handleNextSong, handlePrevSong, navigate],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const content = useMemo(() => {
    if (!chordsStatus) {
      return updateHtmlChords(cords?.content, tune);
    } else {
      let copy = cords?.content.replaceAll(/<span[^>]*>.*?<\/span>/gs, '');
      while (copy.includes('  ')) {
        copy = copy.replaceAll('  ', ' ');
        copy = copy.replaceAll('	 ', ' ');
        copy = copy.replaceAll('\n\n\n', '\n');
        copy = copy.replaceAll(/[|!;:[\]]*/gs, '');
      }
      return copy;
    }
  }, [cords?.content, chordsStatus, tune]);

  useEffect(() => {
    if (isScrolling) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }, Math.round(1000 / scrollSpeed));
    }
  }, [scrollSpeed, isScrolling, scrollInterval]);

  if (!cords?.content) {
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
        <Button
          className={style['btn']}
          onClick={() => setChordsState(!chordsStatus)}
        >
          {chordsStatus ? 'Показати' : 'Приховати'} аккорди
        </Button>
      </div>

      <div ref={contentRef} className={style.chordsContainer}>
        <h2 className={style.title}>{cords.title}</h2>

        <pre
          className={style.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></pre>

        <hr />
        <div className={style['info']}>
          {cords.author && (
            <p className={style.author}>Автор: {cords.author}</p>
          )}
          {cords.link && (
            <p className={style.author}>
              Посилання: <a href={cords.link}>{isAmDm ? 'AmDm' : 'MyChords'}</a>
            </p>
          )}

          {cords.number && (
            <p className={style.author}>Номер: {cords.number}</p>
          )}
          {cords.ton !== undefined && (
            <p className={style.author}>Тональность: {cords.ton}</p>
          )}

          {cords.description && (
            <p className={style.author}>{cords.description}</p>
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
        <Button
          className={style['btn']}
          onClick={() => setChordsState(!chordsStatus)}
        >
          {chordsStatus ? 'Показати' : 'Приховати'} аккорди
        </Button>
        {isOwner && (
          <Button className={style['btn']} onClick={() => {}}>
            Зберегти
          </Button>
        )}

        {cords.link && (
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
    </div>
  );
};

export default PreviewPage;
