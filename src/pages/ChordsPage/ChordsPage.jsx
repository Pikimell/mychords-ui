import style from './ChordsPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getChord } from '../../api/chords';
import { Empty } from 'antd';

const ChordsPage = () => {
  const { id } = useParams();
  const [chord, setChord] = useState();

  useEffect(() => {
    getChord(id).then(setChord);
  }, [id]);

  if (!chord?._id) {
    return (
      <div className={style.emptyContainer}>
        <Empty />
      </div>
    );
  }

  return (
    <div className={style.chordsContainer}>
      <h2 className={style.title}>{chord.title}</h2>
      {chord.author && <p className={style.author}>Автор: {chord.author}</p>}
      {chord.number && <p className={style.author}>Номер: {chord.number}</p>}
      {chord.ton && <p className={style.author}>Тональность: {chord.ton}</p>}

      {chord.description && (
        <p className={style.description}>{chord.description}</p>
      )}
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: chord.content }}
      ></div>
    </div>
  );
};

export default ChordsPage;
