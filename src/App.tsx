import React from 'react'
import './styles/program.css'
import './styles/landing-page.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './providers/AppContextProvider'
import AuthContextProvider from './providers/AuthContextProvider'
import SidebarContextProvider from './providers/SidebarContextProvider'
import HomeLayout from './layout/home.layout'
import Navigation from './navigation'
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
		</BrowserRouter>
	)
}

export default App
