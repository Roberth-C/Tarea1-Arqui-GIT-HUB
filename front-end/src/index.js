// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // Importa el componente App
import reportWebVitals from './reportWebVitals';  // (Opcional) Para medir el rendimiento

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();  // (Opcional) Si deseas medir el rendimiento
