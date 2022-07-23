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
import ChatContextProvider from "./providers/ChatContextProvider";
function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<AuthContextProvider>
					<SidebarContextProvider>
						<ChatContextProvider>
							<HomeLayout>
								<Navigation />
							</HomeLayout>
						</ChatContextProvider>
					</SidebarContextProvider>
				</AuthContextProvider>
			</AppContextProvider>
			<ToastContainer autoClose={3000} pauseOnHover={false} />
		</BrowserRouter>
	)
}

export default App
