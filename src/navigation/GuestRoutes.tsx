import {Route, Routes} from "react-router-dom";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Login from "../pages/Auth/Login";
import React from "react";
import EditPassword from "../pages/Profile/EditPassword";
import EditTraveler from "../pages/Profile/EditTraveler";
import EditUser from "../pages/Profile/EditUser";
import EditCompany from "../pages/Profile/EditCompany";


const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/reset_password/:token" element={<ResetPassword/>} />
      <Route path="/editpassword" element={<EditPassword />} />
      <Route path="/edittraveler" element={<EditTraveler />} />
      <Route path="/editcompany" element={<EditCompany />} />
  <Route path="/edituser" element={<EditUser />} />
    </Routes>
  )
}
export default GuestRoutes;
