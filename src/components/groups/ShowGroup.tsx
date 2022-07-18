import Loader from '../Loader'
import { NavLink ,Link} from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { IGroupShowProps } from '../../config/interfaces/IGroupShowProps.interface'
import Avatar from '@mui/material/Avatar'
import config from '../../config/app_config/config'
import ListPosts from '../../pages/post/list_posts'
const ShowGroupComponent = ({ group }: IGroupShowProps) => {
	const photoPath = group
		? `${config.apiUrl}` + '/uploads/' + `${group.cover_picture}`
		: ''

	return (
		<div>
			{group ? (
				<div>
					<Grid container spacing={2} xs={6} lg={16} mb={3}>
						<Grid item xs={6}>
							<NavLink to={`/group/list`}>
								{' '}
								<Button className="createButton" variant="contained">
									Back
								</Button>
							</NavLink>
						</Grid>
						<Grid item xs={6}>
							<Link to='/post/create' state={{ id: group.id }}>
							<Button className="createButton" variant="contained">
									Create post
								</Button>
							</Link>
							<div></div>
						</Grid>
					</Grid>
					<h2 className="header">{group.country.name}</h2>
					<div>
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
							{group.followers?.map((follower, index) => (
								<Grid item xs={6} key={index}>
									Follower: {follower.name}
								</Grid>
							))}
							<ListPosts />
						</Grid>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowGroupComponent
