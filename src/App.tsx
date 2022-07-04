import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword';
import VerifyCode from './Components/VerifyCode';
import ResetPassword from './Components/ResetPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
          <Routes>
              <Route path="/login"  element= {<Login/>}/>
              <Route path="/register" element= {<Register/>}/>
              <Route path="/forget_password" element= {<ForgetPassword/>}/>
              <Route path="/verify_code" element= {<VerifyCode/>}/>
              <Route path="/reset_password" element= {<ResetPassword/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
