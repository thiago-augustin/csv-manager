import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);