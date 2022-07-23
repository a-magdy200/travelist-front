import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ISentRequestShowProps } from '../../config/interfaces/ISentRequestShowProps.interface';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { IUserInterface } from '../../config/interfaces/IUser.interface';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import api from '../../config/api';
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface';

const MySentRequestCard=({mySentRequest}:ISentRequestShowProps)=>{
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

   const cancelRequest = async (id: number | undefined) => {
			try {
				const response: IResponseInterface<IFriendRequestInterface> =
					await api<IFriendRequestInterface>({
						url: `/api/friendrequests/cancel/${id}`,
						method: 'DELETE',
					})

				if (response.success) {
					alert('Request is cancelled')
				}
			} catch (error: any) {
				console.log(error)
			}
		}
	


useEffect(() => {
    getCurrentUser()
}, [])

   

    return<div>
        
       { currentUser?.id===mySentRequest.sender.user.id?
        
        <Card sx={{ maxWidth: 300 ,m:2}}>
        <Avatar
          alt=""
          src={`http://localhost:4000/${mySentRequest.receiver.user.profile_picture}`}
          sx={{ width: 56, height: 56 }}
          
        />
        <Box>{mySentRequest.receiver.user.name}</Box>
          <Button
				variant="outlined"
                size="medium"
               onClick={() => {
                    cancelRequest(mySentRequest.receiver.id)
                    }}
				>
			Cancel Friend Request
		</Button>
       
        <CardActions>
        </CardActions>
      </Card>
       :
    <div> Can not load card</div>
                }    
</div>
                
                }
export default MySentRequestCard