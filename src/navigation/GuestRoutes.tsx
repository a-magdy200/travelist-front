import {Route, Routes} from "react-router-dom";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Login from "../pages/Auth/Login";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/reset_password/:token" element={<ResetPassword/>} />
    </Routes>
  )
}
export default GuestRoutes;
