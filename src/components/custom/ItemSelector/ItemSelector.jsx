import './ItemSelector.css';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectChords } from '../../../redux/chords/selectors';
import { useEffect, useMemo } from 'react';
import { getChords } from '../../../api/chords';
import { setItems } from '../../../redux/chords/slice';

const ItemSelector = ({ setValue }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectChords);
  const options = useMemo(() => {
    return items.map(item => {
      return { label: item.title, value: item._id };
    });
  }, [items]);
  useEffect(() => {
    if (items.length === 0) {
      getChords({ perPage: 99999 }).then(({ items }) => {
        dispatch(setItems(items));
      });
    }
  }, [items.length, dispatch]);
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
