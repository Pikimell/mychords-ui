import { Route, Routes } from 'react-router-dom';
import Layout from '../wrappers/Layout/Layout';
import pages from '../../pages/index';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route path="/chords/:id" element={<pages.Chords />} />
        <Route path="/collections" element={<pages.Collections />} />
        <Route path="/collections/:id" element={<pages.CollectionItems />} />
        <Route path="/create" element={<pages.Create />} />
        <Route path="/search" element={<pages.Search />} />
        <Route path="*" element={<pages.Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
