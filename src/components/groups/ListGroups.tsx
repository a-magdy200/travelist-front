import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { IGroupShowProps } from '../../config/interfaces/IGroupShowProps.interface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'

const ListGroupsComponent = ({ group }: IGroupShowProps) => {
  return (
    <div>
      {group ? (
        <div>
          <Card >

            <CardContent className="bottom" >

              <h2 className="header">{group.country?.name}</h2>

              <Grid
                container
                direction="column"
                spacing={2}
              >
                <Grid item xs={6}>
                  Country : {group.country?.name}
                </Grid>

                <Grid item xs={6}>
                  Followers Count : {group.followers_count}
                </Grid>
              </Grid>

            </CardContent>

            <CardActions className="bottom">
              <NavLink to={`/group/show/${group.id}`}>
                <Button className="createButton" variant="contained">
                  Show Details
                </Button>
              </NavLink>
            </CardActions>

          </Card>

        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
export default ListGroupsComponent
