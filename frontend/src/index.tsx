import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'antd/dist/antd.css';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
