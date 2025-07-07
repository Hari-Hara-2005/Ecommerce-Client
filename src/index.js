// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust path as needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById('root')
);
