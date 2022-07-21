import api from '../api'
import { IResponseInterface } from '../interfaces/IResponse.interface'
import { IUserInterface } from '../interfaces/IUser.interface'

export const getCurrentUser = async () => {
	try {
		const response: IResponseInterface<IUserInterface> =
			await api<IUserInterface>({
				url: '/api/travelers/friends',
			})

		if (response.success) {
			if (response.data) {
				return response.data
			}
		}
	} catch (error: any) {
		return error
	}
}
