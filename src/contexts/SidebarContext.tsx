import { createContext } from 'react'

const SidebarContext = createContext({
	isOpen: true,
	handleToggle: (value: boolean): void => {},
})
export default SidebarContext
