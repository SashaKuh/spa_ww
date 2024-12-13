import React from 'react';
import './index.css';
import App from './page/App';
import { store } from './redux/store'; 
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
