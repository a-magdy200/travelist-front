import { ComponentProps, useState } from 'react'
import SidebarContext from '../contexts/SidebarContext'

const SidebarContextProvider = ({ children }: ComponentProps<any>) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
	const handleToggleSidebar = (value: boolean): void => {
		setIsSidebarOpen(value)
	}
	return (
		<SidebarContext.Provider
			value={{
				isOpen: isSidebarOpen,
				handleToggle: handleToggleSidebar,
			}}
		>
			{children}
		</SidebarContext.Provider>
	)
}
export default SidebarContextProvider
