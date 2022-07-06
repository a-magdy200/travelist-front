import './App.css';
import React from 'react';
//import logo from './logo.svg';
import Profile from './Components/Profile';
import EditPassword from './Components/EditPassword';
import EditUser from './Components/EditUser';
import Traveler from './Components/Traveler';
import TravelerProfile from './Components/TravelerProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App(){

    return (
      <BrowserRouter>
            <Routes>
                <Route path="/profile"  element= {<Profile/>}/>
                <Route path="/traveler"  element= {<Traveler/>}/>
                <Route path="/travelerprofile"  element= {<TravelerProfile/>}/>
                <Route path="/editpassword"  element= {<EditPassword/>}/>
                <Route path="/edituser"  element= {<EditUser/>}/>
            </Routes>
      </BrowserRouter>
    );
}

export default App;
