import { useContext } from 'react'
import SidebarContext from '../contexts/SidebarContext'

const useSidebarContext = () => {
	const context = useContext(SidebarContext)
	if (context === undefined) {
		throw new Error('useSidebarContext was used outside of its Provider')
	}
	return context
}
export default useSidebarContext
