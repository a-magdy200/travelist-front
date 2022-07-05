import React from 'react';
import './App.css';
import './styles/program.css'
import ListPrograms from './components/programs/index';
import ShowProgram from './components/programs/show';
import EditProgram from './components/programs/edit';
import CreateProgram from './components/programs/create2';
import CreateCycle from './components/cycles/create';
import ShowCycle from './components/cycles/show';
import ListCycles from './components/cycles/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ListPrograms/>}/>
         <Route path="/program/list" element={<ListPrograms/>}/>
         <Route path="/program/create" element={<CreateProgram/>}/>
         <Route path="/program/show/:id" element={<ShowProgram/>}/>
         <Route path="/cycle/create" element={<CreateCycle/>}/>
         <Route path="/cycle/list" element={<ListCycles/>}/>
         <Route path="/cycle/show/:id" element={<ShowCycle/>}/>
      </Routes>
      </BrowserRouter>  
  );
}

export default App;

