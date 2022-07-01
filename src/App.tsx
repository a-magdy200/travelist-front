import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/login"  element= {<Login/>}/>
              <Route path="/register" element= {<Register/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
