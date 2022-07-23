import React from 'react'
import './styles/program.css'
import './styles/landing-page.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './providers/AppContextProvider'
import AuthContextProvider from './providers/AuthContextProvider'
import SidebarContextProvider from './providers/SidebarContextProvider'
import HomeLayout from './layout/home.layout'
import Navigation from './navigation'
import { ToastContainer } from "react-toastify";
function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<AuthContextProvider>
					<SidebarContextProvider>
						<HomeLayout>
							<Navigation />
						</HomeLayout>
					</SidebarContextProvider>
				</AuthContextProvider>
			</AppContextProvider>
			<ToastContainer autoClose={3000} />
		</BrowserRouter>
	)
}

export default App
