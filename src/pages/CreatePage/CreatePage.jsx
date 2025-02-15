import { Flex, Input, InputNumber } from 'antd';
import style from './CreatePage.module.css';
import { useEffect, useState } from 'react';
import Button from '../../components/custom/Button/Button';
import { createChord, getChord, updateChord } from '../../api/chords';
import { getUserId } from '../../utils/initTelegram';
import { getHTML } from '../../api/lyrics';
import { parseHtmlChords } from '../../utils/htmlParser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [params] = useSearchParams();
  const userId = getUserId();
  const itemId = params.get('id');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId,
    title: '',
    content: '',
  });

  useEffect(() => {
    if (userId === 'anonym') {
      navigate('/');
      toast.error('You are not authorized!');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (itemId) {
      getChord(itemId).then(setFormData);
    }
  }, [itemId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeTon = value => {
    setFormData({ ...formData, ton: value });
  };
  const handleChangeNumber = value => {
    setFormData({ ...formData, number: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (itemId) {
      updateChord(itemId, formData).then(() => {
        navigate(`/chords/${itemId}`);
      });
    } else {
      createChord(formData);
    }

    clearForm();
  };

  const clearForm = () => {
    setFormData({
      userId,
      title: '',
      content: '',
    });
  };

  const handleLoad = async () => {
    if (!formData.link?.length) return;
    const html = await getHTML(formData.link);
    const content = parseHtmlChords(formData.link, html);

    setFormData({ ...formData, content });
  };

  const handleParse = () => {
    navigate('/parse');
  };
  return (
    <Flex vertical className={style.page}>
      {!itemId && (
        <Flex className={style.createPageContainer} vertical>
          <Input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
            className={style.input}
          />
          <Button onClick={handleLoad}>Завантажити</Button>
          <Button onClick={handleParse}>Парсити з сайту</Button>
        </Flex>
      )}
      <div className={style.createPageContainer}>
        <h2 className={style.heading}>Create a New Chord</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className={style.input}
          />
          <Input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className={style.input}
          />

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className={style.textarea}
            required
          ></textarea>

          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            className={style.textarea}
          ></textarea>
          <Input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
            className={style.input}
          />
          <InputNumber
            type="number"
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChangeNumber}
            className={style.input}
          />
          <InputNumber
            type="number"
            name="ton"
            placeholder="Ton for Am or Em"
            value={formData.ton}
            onChange={handleChangeTon}
            className={style.input}
          />
          <button type="submit" className={style.button}>
            {itemId ? 'Оновити' : 'Створити'}
          </button>
        </form>
      </div>
    </Flex>
  );
};

export default CreatePage;
