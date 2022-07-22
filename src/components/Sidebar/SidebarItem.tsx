import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import * as React from 'react'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import useSidebarContext from '../../hooks/useSidebarContext'
import useAppContext from '../../hooks/useAppContext'
interface SidebarItemProps {
	title: string
	icon: ReactElement
	to: string
}
const SidebarItem = ({ title, icon, to }: SidebarItemProps) => {
	const { isOpen } = useSidebarContext()
	const navigate = useNavigate()
	const { setPageTitle } = useAppContext()
	const handleNavigation = () => {
		navigate(to)
		setPageTitle(title)
	}
	return (
		<ListItem disablePadding sx={{ display: 'block' }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: isOpen ? 'initial' : 'center',
					px: 2.5,
				}}
				onClick={handleNavigation}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: isOpen ? 3 : 'auto',
						justifyContent: 'center',
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText primary={title} sx={{ opacity: isOpen ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	)
}
export default SidebarItem
