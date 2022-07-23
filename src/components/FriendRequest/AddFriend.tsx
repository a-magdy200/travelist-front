import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { IUserInterface } from '../../config/interfaces/IUser.interface';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import api from '../../config/api';
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface';
import { IAddFriendRequestBody } from '../../config/interfaces/IAddFriendRequestBody.interface';
import { useParams } from 'react-router-dom'

const AddFriendComponent=()=>{
    const [currentUser, setCurrentUser] = useState<IUserInterface>()
    const { oppsiteUserId } = useParams()   
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

	
        const sendRequest= async (id: string| undefined)=> {
            try {
               
            const response:IResponseInterface<IFriendRequestInterface> =
                await api<IFriendRequestInterface>({
                        url: `/api/friendrequests/send/${id}`,
                        method: 'POST',
                    })
    
                if (response.success) {
                    if (response.data) {
                        alert('Request sent successfully')
                    }
                }
            } catch (error: any) {
                console.log(error)
            }
        }
    
   

useEffect(() => {
    getCurrentUser()
}, [])

   

    return(<div>   
        <Button
				variant="outlined"
                size="medium"
                    onClick={() => {
                    sendRequest(oppsiteUserId)
                    }}
				>
		Add as a Friend
		</Button>
    
                    
</div>)
                
                }    
export default AddFriendComponent