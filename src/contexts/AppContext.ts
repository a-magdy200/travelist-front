import { createContext } from 'react'
export const DEFAULT_APP_CONTEXT_STATE = {
	pageTitle: 'Travelist',
	setPageTitle: (title: string) => {},
}
const AppContext = createContext(DEFAULT_APP_CONTEXT_STATE)
export default AppContext
