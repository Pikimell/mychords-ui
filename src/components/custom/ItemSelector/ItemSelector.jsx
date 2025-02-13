import './ItemSelector.css';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { selectChords } from '../../../redux/chords/selectors';
import { useMemo } from 'react';

const ItemSelector = ({ setValue }) => {
  const items = useSelector(selectChords);
  const options = useMemo(() => {
    return items.map(item => {
      return { label: item.title, value: item._id };
    });
  }, [items]);
  return (
    <div className="item-selector">
      <Select
        showSearch
        placeholder="Select song"
        optionFilterProp="label"
        onChange={setValue}
        onSearch={() => {}}
        options={options}
      />
    </div>
  );
};

export default ItemSelector;
