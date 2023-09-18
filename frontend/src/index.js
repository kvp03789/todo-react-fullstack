import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import ProjectContextProvider from './context/projectContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="container">
      <BrowserRouter>
      <ProjectContextProvider>
        <App />
      </ProjectContextProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

