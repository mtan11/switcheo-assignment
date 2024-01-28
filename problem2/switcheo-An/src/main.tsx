import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import '@switcheo/styles/style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
