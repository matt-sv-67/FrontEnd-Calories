// Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
