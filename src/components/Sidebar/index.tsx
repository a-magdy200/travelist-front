import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import * as React from 'react'
import { Drawer, DrawerHeader } from '../styled/header_styled_components'
import { HomeOutlined } from '@ant-design/icons'
import SidebarItem from './SidebarItem'
import useSidebarContext from '../../hooks/useSidebarContext'
import Box from '@mui/material/Box'
import { APP_NAME, DRAWER_WIDTH } from '../../config/helpers/constants'
import Typography from '@mui/material/Typography'
import useAuth from "../../hooks/useAuth";
import CompanySidebar from "./CompanySidebar";
import TravelerSidebar from "./TravelerSidebar";

const Sidebar = () => {
	const { isOpen, handleToggle } = useSidebarContext()
	const {user} = useAuth();
	return (
		<Drawer variant="permanent" open={isOpen}>
			<DrawerHeader>
				<Box
					alignItems={'center'}
					justifyContent={'space-between'}
					display={'flex'}
					sx={{
						width: DRAWER_WIDTH,
						height: '100%',
						paddingLeft: '20px',
						paddingRight: '10px',
						color: 'white',
						backgroundColor: 'primary.dark',
					}}
				>
					<Typography variant={'h5'}>{isOpen ? APP_NAME : null}</Typography>
					<IconButton color={'inherit'} onClick={() => handleToggle(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</Box>
			</DrawerHeader>
			<Divider />
			<List>
				<SidebarItem title={'home'} icon={<HomeOutlined />} to={'/'} />
				{user.type === 'company' ? (
					<CompanySidebar />
				): (
					<TravelerSidebar />
				)}
			</List>
		</Drawer>
	)
}
export default Sidebar
