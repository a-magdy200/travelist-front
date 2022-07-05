import './App.css';
import React from 'react';
//import logo from './logo.svg';
import Profile from './Components/Profile';
import Traveler from './Components/Traveler';
import EditPassword from './Components/EditPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App(){

    return (
      <BrowserRouter>
            <Routes>
                <Route path="/profile"  element= {<Profile/>}/>
                <Route path="/traveler"  element= {<Traveler/>}/>
                <Route path="/editpassword"  element= {<EditPassword/>}/>
                
            </Routes>
      </BrowserRouter>
    );
}

export default App;
