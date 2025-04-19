import './Item.css';

import { Flex, message } from 'antd';
import { createChord } from '../../../../api/chords';
import { getUserId } from '../../../../utils/initTelegram';
import { searchItem } from '../../../../api/mychords';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPreviewItem } from '../../../../redux/chords/slice';
const Item = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = getUserId();
  const [messageApi, contextHolder] = message.useMessage();
  const { author, title } = data;

  const onSave = async () => {
    messageApi.open({
      type: 'loading',
      content: 'Зберігаємо...',
    });

    const chords = await searchItem(data.link);
    console.log(chords);

    createChord({ ...chords, userId });

    messageApi.open({
      type: 'success',
      content: 'Збережено!',
    });
  };

  const onOpen = () => {
    dispatch(setPreviewItem(data));
    navigate('/chords/preview');
  };

  return (
    <Flex
      className="song-item"
      align="center"
      gap="small"
      justify="space-between"
    >
      {contextHolder}
      <Flex vertical>
        <p className="song-title">{title.split(' - ').slice(1).join(' - ')}</p>
        <p className="song-artist">{author}</p>
      </Flex>
      <Flex gap="small">
        <button className="button-open" onClick={onOpen}>
          Відкрити
        </button>
        <button className="button-save" onClick={onSave}>
          Зберегти
        </button>
      </Flex>
    </Flex>
  );
};

export default Item;
