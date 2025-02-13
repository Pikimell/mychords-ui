import { Flex, Input, InputNumber } from 'antd';
import style from './CreatePage.module.css';
import { useState } from 'react';
import Button from '../../components/custom/Button/Button';
import { createChord } from '../../api/chords';
import { getUserId } from '../../utils/initTelegram';
import { getHTML } from '../../api/lyrics';
import { parseHtmlChords } from '../../utils/htmlParser';

const CreatePage = () => {
  const userId = getUserId();

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
  };

  const handleLoad = async () => {
    if (!formData.link?.length) return;
    const html = await getHTML(formData.link);
    const myElem = parseHtmlChords(formData.link, html);
    const content = myElem.innerHTML.replaceAll(/class=".*"/g, '');
    setFormData({ ...formData, content });
  };
  return (
    <Flex vertical className={style.page}>
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
          {/* <Input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className={style.input}
          /> */}
          <button type="submit" className={style.button}>
            Create
          </button>
        </form>
      </div>
    </Flex>
  );
};

export default CreatePage;
