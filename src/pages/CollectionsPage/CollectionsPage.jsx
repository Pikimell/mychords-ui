import { Flex } from 'antd';
import Button from '../../components/custom/Button/Button';
import Search from '../../components/custom/Search/Search';
import CollectionList from '../../components/sections/CollectionList/CollectionList';
import style from './CollectionsPage.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCollection } from '../../api/collections';
import { create } from '../../redux/collections/slice';
import { getUserId } from '../../utils/initTelegram';
import { setTitle } from '../../redux/meta/slice';

const CollectionsPage = () => {
  const userId = getUserId();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const isAnonym = userId === 'anonym';
  const dispatch = useDispatch();
  dispatch(setTitle('Колекції'));
  const handleChange = value => {
    setSearch(value);
    setParams({ title: value });
  };

  const handleCreate = () => {
    if (!search.trim()) return;
    const collection = {
      title: search.trim(),
      userId: getUserId(),
      items: [],
    };
    handleChange('');
    createCollection(collection).then(data => {
      dispatch(create(data));
    });
  };

  return (
    <div className={style['page']}>
      <Flex className={style['header']}>
        <Search value={search} onChange={handleChange} placeholder="Шукати" />
        {!isAnonym && (
          <Button onClick={handleCreate}>
            <AiOutlinePlusCircle size="20px" />
          </Button>
        )}
      </Flex>

      <CollectionList />
    </div>
  );
};

export default CollectionsPage;
