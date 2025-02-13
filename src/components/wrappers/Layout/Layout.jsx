import { Suspense } from 'react';
import Footer from '../../sections/Footer/Footer';
import Header from '../../sections/Header/Header';
import style from './Layout.module.css';
import { usePreload } from '../../../hooks/usePreload';

const Layout = ({ children }) => {
  usePreload();
  return (
    <>
      <Header />
      <div className={style['container']}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
          {children}
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
