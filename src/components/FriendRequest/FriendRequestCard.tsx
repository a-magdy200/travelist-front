import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IFriendRequestShowProps } from '../../config/interfaces/IFriendRequestShowProps.interface';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { IUserInterface } from '../../config/interfaces/IUser.interface';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import api from '../../config/api';
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface';

const FriendRequestCard=({friendRequest}:IFriendRequestShowProps)=>{
    const [currentUser, setCurrentUser] = useState<IUserInterface>()
    const getCurrentUser  = async () => {
        try {
            const response: IResponseInterface<IUserInterface> = await api<
                IUserInterface
            >({
                url: '/api/users/current/user',
            })
    
            if (response.success) {
                if (response.data) {
                  setCurrentUser(response.data)
                }
            }
        } catch (error: any) {
         console.log(error)
        }
    }

   const acceptRequest = async (id: number | undefined) => {
			try {
				const response: IResponseInterface<IFriendRequestInterface> =
					await api<IFriendRequestInterface>({
						url: `/api/friendrequests/accept/${id}`,
						method: 'PUT',
					})

				if (response.success) {
					alert('You are now friends')
				}
			} catch (error: any) {
				console.log(error)
			}
		}
	

    const rejectRequest = async (id: number | undefined) => {
        try {
            const response: IResponseInterface<IFriendRequestInterface> =
                await api<IFriendRequestInterface>({
                    url: `/api/friendrequests/reject/${id}`,
                    method: 'PUT',
                })

            if (response.success) {
                alert('Request Removed')
            }
        } catch (error: any) {
            console.log(error)
        }
    }


useEffect(() => {
    getCurrentUser()
}, [])

   

    return<div>
        
       { currentUser?.id===friendRequest.receiver.user.id?
        
        <Card sx={{ maxWidth: 300 ,m:2}}>
        <Avatar
          alt=""
          src={`http://localhost:4000/${friendRequest.sender.user.profile_picture}`}
          sx={{ width: 56, height: 56 }}
          
        />
        <Box>{friendRequest.sender.user.name}</Box>
          <Button
				variant="contained"
                size="medium"
               onClick={() => {
                    acceptRequest(friendRequest.sender.user.id)
                    }}
				>
			Accept
		</Button>
        <Button
				variant="contained"
                size="medium"
                    onClick={() => {
                    rejectRequest(friendRequest.sender.user.id)
                    }}
				>
			Reject
		</Button>
        <CardActions>
        </CardActions>
      </Card>
       :
    <div></div>
                }    
</div>
                
                }
export default FriendRequestCard