import React from 'react'
import './App.css'
import './styles/program.css'
import ListPrograms from './components/programs/index'
import Create from './components/programs/create'
import Create2 from './components/programs/create2'
import Show from './components/programs/show'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword'
import VerifyCode from './components/VerifyCode'
import ResetPassword from './components/ResetPassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowProgram from './components/programs/show'
import CreateProgram from './components/programs/create2'
import CreateCycle from './components/cycles/create'
import ShowCycle from './components/cycles/show'
import ListCycles from './components/cycles/index'
import EditCycle from './components/cycles/edit'
import EditPassword from './Components/EditPassword'
import EditUser from './Components/EditUser'
import Traveler from './Components/Traveler'
import TravelerProfile from './Components/TravelerProfile'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forget_password" element={<ForgetPassword />} />
				<Route path="/verify_code" element={<VerifyCode />} />
				<Route path="/reset_password" element={<ResetPassword />} />
				<Route path="/" element={<ListPrograms />} />
				<Route path="/index" element={<ListPrograms />} />
				<Route path="/create" element={<Create />} />
				<Route path="/create2" element={<Create2 />} />
				<Route path="/show" element={<Show />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/traveler" element={<Traveler />} />
				<Route path="/travelerprofile" element={<TravelerProfile />} />
				<Route path="/editpassword" element={<EditPassword />} />
				<Route path="/edituser" element={<EditUser />} />
				<Route path="/cycle/create" element={<CreateCycle />} />
				<Route path="/" element={<ListPrograms />} />
				<Route path="/program/list" element={<ListPrograms />} />
				<Route path="/program/create" element={<CreateProgram />} />
				<Route path="/program/show/:id" element={<ShowProgram />} />
				<Route path="/cycle/create" element={<CreateCycle />} />
				<Route path="/cycle/list" element={<ListCycles />} />
				<Route path="/cycle/show/:id" element={<ShowCycle />} />
				<Route path="/cycle/edit/:id" element={<EditCycle />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
