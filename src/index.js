import React from 'react';
import App from './Screens/App'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const container = document.getElementById('root');
const check = createRoot(container); 
check.render(  
<BrowserRouter>  
  <App/>
</BrowserRouter>  
);