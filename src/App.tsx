import React from 'react'
import './App.css'
import './styles/program.css'
import ListPrograms from './components/programs/index'
import CreateProgram from './components/programs/create'
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
import EditPassword from './components/EditPassword'
import EditUser from './components/EditUser'
import Traveler from './components/Traveler'
import TravelerProfile from './components/TravelerProfile'
import CompanyProfile from './components/CompanyProfile'

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
				<Route path="/create" element={<CreateProgram />} />
				<Route path="/show" element={<Show />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/traveler" element={<Traveler />} />
				<Route path="/travelerprofile" element={<TravelerProfile />} />
				<Route path="/editpassword" element={<EditPassword />} />
				<Route path="/edituser" element={<EditUser />} />
				<Route path="/companyprofile" element={<CompanyProfile />} />
				<Route path="/" element={<ListPrograms />} />
				<Route path="/program/list" element={<ListPrograms />} />
				<Route path="/program/show/:id" element={<ShowProgram />} />
				
				<Route path="/cycle/create" element={<CreateCycle />} />
				
				<Route path="/program/create" element={<CreateProgram />} />
			
				<Route path="/program/edit/:id" element={<EditProgram />} />
				<Route path="/cycle/create" element={<CreateCycle />} />
				<Route path="/cycle/list" element={<ListCycles />} />
				<Route path="/cycle/show/:id" element={<ShowCycle />} />
		
			</Routes>
		</BrowserRouter>
	)
}

export default App
