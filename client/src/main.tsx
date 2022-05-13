import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './routes';
import './assets/sass/base.sass';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
