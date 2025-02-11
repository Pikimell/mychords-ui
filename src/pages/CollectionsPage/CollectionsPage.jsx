import Button from '../../components/custom/Button/Button';
import Search from '../../components/custom/Search/Search';
import CollectionList from '../../components/sections/CollectionList/CollectionList';
import style from './CollectionsPage.module.css';

const CollectionsPage = () => {
  return (
    <div className={style['page']}>
      <div>
        <Search />
        <Button>Створити</Button>
      </div>

      <CollectionList />
    </div>
  );
};

export default CollectionsPage;
