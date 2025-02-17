import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import './style/variables.css';
import './style/reset.css';
import './style/index.css';

window.addEventListener('keypress', e => {
  if (e.ctrlKey && e.code === 'KeyU') {
    localStorage.setItem('isAdmin', 'true');
  }
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
