import { Flex, Input, InputNumber } from 'antd';
import { createChord } from '../../api/chords';
import { getUserId } from '../../utils/initTelegram';
import style from './ParsePage.module.css';
import { useState } from 'react';
import Button from '../../components/custom/Button/Button';

const ParsePage = () => {
  const userId = getUserId();
  const [htmlContent, setHtmlContent] = useState('');
  const [formData, setFormData] = useState({
    userId,
    title: '',
    content: '',
  });

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
    createChord(formData);
    clearForm();
  };
  const clearForm = () => {
    setFormData({
      userId,
      title: '',
      content: '',
    });
    setHtmlContent('');
  };

  const parseChords = () => {
    const dom = document.createElement('html');
    dom.innerHTML = htmlContent;
    const title = dom
      .querySelector('.b-title.b-title--song')
      .textContent.trim();

    const author = [...dom.querySelectorAll('.b-breadcrumbs a')]
      .reverse()[0]
      .textContent.trim();
    const content = dom.querySelector('.w-words__text').innerHTML.trim();

    setFormData({ userId, title, author, content });
  };

  const parseAmdm = () => {
    const dom = document.createElement('html');
    dom.innerHTML = htmlContent;
    const title = dom.querySelector('h1').textContent.split(',')[0].trim();
    const author = [...dom.querySelectorAll('.nav-list > li > a')]
      .reverse()[0]
      .textContent.trim();
    const chords = dom.querySelector('pre').innerHTML.trim();
    const content = chords
      .replace(/<\/?div[^>]*>/g, '')
      .replaceAll(']:', ']:\n');

    setFormData({ userId, title, author, content });
  };

  return (
    <Flex vertical className={style.page}>
      <Flex className={style.createPageContainer} vertical>
        <textarea
          type="text"
          name="link"
          placeholder="HTML PAGE"
          value={htmlContent}
          onChange={e => setHtmlContent(e.target.value)}
          className={style.input}
        />
        <Button onClick={parseChords}>Парсити Mychords</Button>
        <Button onClick={parseAmdm}>Парсити AmDm</Button>
      </Flex>
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
            Create
          </button>
        </form>
      </div>
    </Flex>
  );
};

export default ParsePage;
