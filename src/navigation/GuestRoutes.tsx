import {Route, Routes} from "react-router-dom";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import VerifyCode from "../pages/Auth/VerifyCode";
import ResetPassword from "../pages/Auth/ResetPassword";
import Login from "../pages/Auth/Login";
import React from "react";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget_password " element={<ForgetPassword />} />
      <Route path="/verify_code" element={<VerifyCode />} />
      <Route path="/reset_password" element={<ResetPassword />} />
    </Routes>
  )
}
export default GuestRoutes;
