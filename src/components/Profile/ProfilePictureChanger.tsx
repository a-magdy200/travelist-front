import * as React from 'react'
import { useRef } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import api from '../../config/api'
import Avatar from '@mui/material/Avatar'
import image from '../../assets/avatar.png'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import { ICompanyShowProps } from '../../config/interfaces/ICompanyShowProps.interface'

const ProfilePictureChanger = ({
	profile_picture,
}: {
	profile_picture?: string
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const Input = styled('input')({
		display: 'none',
	})

	const uploadProfilePicture = async (picture: File) => {
		console.log('here two')
		console.log('photo', picture)
		const formData = new FormData()
		if (picture) {
			formData.append('profile_picture', picture)
		}
		console.log('test', formData)
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/3/profile_picture`,
					method: 'PUT',
					body: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
			console.log(response)
			if (response.success) {
				console.log('here 3')
				if (response.data) {
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	return (
		<div>
			<Avatar
				alt=""
				src="/home/nagwa/Documents/new/travelist-backend/uploads/users/1657645987035-382067366-b.png"
				sx={{ width: 112, height: 112 }}
			/>
			{/*<label htmlFor="icon-button-file">*/}
			{/*	<Input*/}
			{/*		accept="image/*"*/}
			{/*		id="icon-button-file"*/}
			{/*		type="file"*/}
			{/*		onChange={(e) => {*/}
			{/*			if (e.target.files && e.target.files[0]) {*/}
			{/*				uploadProfilePicture(e.target.files[0])*/}
			{/*				// console.log('here')*/}
			{/*			}*/}
			{/*		}}*/}
			{/*	/>*/}

			{/*	<IconButton*/}
			{/*		color="primary"*/}
			{/*		aria-label="upload picture"*/}
			{/*		component="span"*/}
			{/*	>*/}
			{/*		<PhotoCamera />*/}
			{/*	</IconButton>*/}
			{/*</label>*/}
		</div>
	)
}
export default ProfilePictureChanger
