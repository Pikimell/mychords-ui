import './SearchItems.css';

import Item from './Item/Item';
import { Flex } from 'antd';

const SearchItems = ({ items }) => {
  return (
    <Flex vertical className="item-list">
      {items.map((el, i) => {
        return <Item key={i} data={el} />;
      })}
    </Flex>
  );
};

export default SearchItems;
