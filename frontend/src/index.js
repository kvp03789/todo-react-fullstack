import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import All from './pages/Home';
import Week from './pages/Week';
import Today from './pages/Today';
import Important from './pages/Important';
import Nav from './components/Nav';
import Header from './components/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <Header/>
      
      <BrowserRouter>
        <main>
          <Nav/>
          <Routes>
            <Route path="/all" element={<All />}></Route>
            <Route path="week" element={<Week />}></Route>
            <Route path="today" element={<Today />}></Route>
            <Route path="important" element={<Important />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

