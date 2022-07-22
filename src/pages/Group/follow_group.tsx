import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import api from '../../config/api'

interface IFollowGroupRequestBody {
	groupId: number
}

const FollowGroup = () => {
	const { id } = useParams()

	const requestBody: IFollowGroupRequestBody = {
		id,
	}

	const getGroup = async () => {
		try {
			const response: IResponseInterface<IGroupInterface> =
				await api<IGroupInterface>({
					url: `/api/groups/add/user`,
					method: 'POST',
					body: JSON.stringify(requestBody),
				})
			if (response.success) {
				if (response.data) {
					console.log('followed')
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
}
export default FollowGroup
