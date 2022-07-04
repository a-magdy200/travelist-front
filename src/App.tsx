import './App.css';
import React from 'react';
//import logo from './logo.svg';
import Profile from './Components/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App(){

    return (
      <BrowserRouter>
            <Routes>
                <Route path="/profile"  element= {<Profile/>}/>
            </Routes>
      </BrowserRouter>
    );
}

export default App;
