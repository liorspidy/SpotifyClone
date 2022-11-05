import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataLayer } from './store/DataLayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <DataLayer>
    <App />
  </DataLayer>
  // </React.StrictMode>
);
