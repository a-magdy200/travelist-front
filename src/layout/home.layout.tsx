import React, { ComponentProps } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Sidebar from '../components/Sidebar'
import { DrawerHeader } from '../components/styled/header_styled_components'
import CustomAppBar from '../components/CustomAppBar/CustomAppBar'
import useAuth from '../hooks/useAuth'

const HomeLayout = ({ children }: ComponentProps<any>) => {
	const { isLoggedIn } = useAuth()
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<CustomAppBar />
			{isLoggedIn ? <Sidebar /> : null}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	)
}
export default HomeLayout
