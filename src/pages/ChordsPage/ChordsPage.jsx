import style from './ChordsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getChord } from '../../api/chords';
import { Empty, Flex, Modal } from 'antd';
import { getUserId } from '../../utils/initTelegram';
import Button from '../../components/custom/Button/Button';
import ItemSelector from '../../components/custom/ItemSelector/ItemSelector';
import EditCollection from '../../components/sections/EditCollection/EditCollection';
import { useModal } from '../../hooks/useModal';

const ChordsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chord, setChord] = useState();
  const isAmDm = chord?.link?.includes('amdm');
  const isOwner = chord?.userId == getUserId();
  const [chordsStatus, setChordsState] = useState(false);
  const { modalState, openModal, closeModal } = useModal();

  useEffect(() => {
    getChord(id).then(setChord);
  }, [id]);

  const content = useMemo(() => {
    if (!chordsStatus) {
      return chord?.content;
    } else {
      return chord?.content.replaceAll(/<span[^>]*>.*?<\/span>/gs, '');
    }
  }, [chord, chordsStatus]);

  const handleSelectItem = value => {
    navigate(`/chords/${value}`);
  };
  const handleEditClick = () => {
    navigate(`/create?id=${id}`);
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
      <Flex justify="center">
        <ItemSelector setValue={handleSelectItem} />
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
      {isOwner && (
        <div className={style['controls']}>
          <Button onClick={handleEditClick}>Змінити</Button>
          <Button onClick={openModal}>Колекції</Button>
          {chord.link && <Button>Посилання</Button>}
          <Button onClick={() => setChordsState(!chordsStatus)}>
            {chordsStatus ? 'Показати' : 'Приховати'} аккорди
          </Button>
          <Button>Видалити</Button>
        </div>
      )}

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
