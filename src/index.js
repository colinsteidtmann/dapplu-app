import React from 'react';
// Reacts imports
import ReactDOM from 'react-dom';
import './index.css';
import App from '#app/App';
import reportWebVitals from './reportWebVitals';
// My package imports


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
