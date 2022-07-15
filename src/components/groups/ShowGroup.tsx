import Loader from '../Loader'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { IGroupShowProps } from '../../config/interfaces/IGroupShowProps.interface'
import Avatar from '@mui/material/Avatar'
import config from '../../config/app_config/config'

const ShowGroupComponent = ({ group }: IGroupShowProps) => {
	const photoPath = group
		? `${config.apiUrl}` + '/uploads/programs/' + `${group.cover_picture}`
		: ''

	return (
		<div>
			{group ? (
				<div>
					<div>
						<h1>Group Details</h1>
					</div>

					<div className="bottom">
						<h2 className="header">{group.country.name}</h2>

						<Avatar
							className="header"
							alt=""
							src={photoPath}
							sx={{ width: 112, height: 112 }}
						/>

						<Grid
							container
							direction="column"
							spacing={2}
							xs={10}
							lg={8}
							mb={3}
						>
							<Grid item xs={6}>
								Country : {group.country.name}
							</Grid>

							<Grid item xs={6}>
								Followers Count : {group.followers_count}
							</Grid>

							{group.posts?.map((post, index) => (
								<Grid item xs={6} key={index}>
									Post: {post.content}
								</Grid>
							))}

							{group.followers?.map((follower, index) => (
								<Grid item xs={6} key={index}>
									Follower: {follower.name}
								</Grid>
							))}
						</Grid>
					</div>

					<NavLink to={`/group/list`}>
						{' '}
						<Button className="createButton" variant="contained">
							Back
						</Button>
					</NavLink>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowGroupComponent


