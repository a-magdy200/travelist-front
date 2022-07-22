import { ComponentProps, useState } from 'react'
import AppContext from '../contexts/AppContext'
import { APP_NAME } from '../config/helpers/constants'

const AppContextProvider = ({ children }: ComponentProps<any>) => {
	const [pageTitle, setPageTitle] = useState<string>(APP_NAME)
	const appContextValue = {
		pageTitle,
		setPageTitle,
	}
	return (
		<AppContext.Provider value={appContextValue}>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
