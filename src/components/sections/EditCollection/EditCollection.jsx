import { useDispatch, useSelector } from 'react-redux';
import style from './EditCollection.module.css';
import { useEffect, useState } from 'react';
import { selectCollections } from '../../../redux/collections/selectors';
import { getChord, updateChord } from '../../../api/chords';
import { updateItem } from '../../../redux/chords/slice';

const EditCollection = ({ chordId }) => {
  const [chord, setChord] = useState();
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);

  useEffect(() => {
    getChord(chordId).then(setChord);
  }, [chordId]);

  const handleToggle = collectionId => {
    const arr = chord.collections || [];
    if (arr.includes(collectionId)) {
      const collections = [...arr].filter(el => el != collectionId);
      updateChord(chord._id, { collections }).then(data => {
        dispatch(updateItem(data));
      });
      setChord({ ...chord, collections });
    } else {
      const collections = [...arr, collectionId];
      updateChord(chord._id, { collections }).then(data => {
        dispatch(updateItem(data));
      });
      setChord({ ...chord, collections });
    }
  };

  if (!chord?._id) return;

  return (
    <div className={style['edit-collection']}>
      {collections.map(el => {
        const isActive = chord?.collections?.includes(el._id);
        const classes = `${style['tag-collection']} ${
          isActive ? style['active'] : ''
        }`;

        return (
          <div
            key={el._id}
            className={classes}
            onClick={() => handleToggle(el._id)}
          >
            {el.title}
          </div>
        );
      })}
    </div>
  );
};

export default EditCollection;
