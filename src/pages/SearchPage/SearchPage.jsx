import css from './SearchPage.module.css';
import { useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { searchItems } from '../../api/mychords.js';
import SearchItems from '../../components/custom/SearchItems/SearchItems';
import toast from 'react-hot-toast';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const chordsSearch = async () => {
    setItems([]);

    const promise = searchItems({ title: query, page: 1 }).then(data => {
      setItems(data);
    });

    toast.promise(promise, {
      success: 'Готово!',
      error: 'Упс, щось пішло не так!',
      loading: 'Почекайте, шукаємо!',
    });

    setQuery('');
  };

  return (
    <Flex
      vertical
      align="center"
      gap="middle"
      className={css['main-container']}
    >
      <Flex align="stretch" gap="small">
        <Input
          size="large"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Flex justify="stretch" gap="small">
          <Button size="large" onClick={chordsSearch}>
            🔍 Шукати 🔍
          </Button>
        </Flex>
      </Flex>

      <SearchItems items={items} />
    </Flex>
  );
};

export default SearchPage;
