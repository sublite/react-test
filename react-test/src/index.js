import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Users from './components/Users';
import Albums from './components/Albums';


ReactDOM.render(
  <React.StrictMode>
    <Albums />
  </React.StrictMode>,
  document.getElementById('root')
);

