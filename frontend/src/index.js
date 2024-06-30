import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import 'apexcharts';
import 'bootstrap';
import 'chart.js';
import 'echarts';
import 'quill';
import 'simple-datatables'; 
import 'tinymce';
import './validate.js';

import './main.js';

import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'remixicon/fonts/remixicon.css';
import 'simple-datatables/dist/style.css';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';

import { AppProvider } from './Context/AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

