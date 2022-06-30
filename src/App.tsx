import React from 'react';
import './App.css';
import './styles/program.css'
import ListPrograms from './components/programs/index';
import Create from './components/programs/create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ListPrograms/>}/>
         <Route path="/index" element={<ListPrograms/>}/>
         <Route path="/create" element={<Create/>}/>
      </Routes>
      </BrowserRouter>  
  );
}

export default App;

