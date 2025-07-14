import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/magnific-popup/dist/magnific-popup.css';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/flaticon/flaticon.css';
import './assets/css/style.css';
import './index.css';

// Get the root container
const container = document.getElementById('VaidyaBandhu');

// Create root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();