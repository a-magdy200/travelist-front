import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface"
import { IFriendRequestListProps } from "../../config/interfaces/IFriendRequestListProps.interface"
import FriendRequestCard from "./FriendRequestCard"

const ListFriendRequestsComponent=({friendRequests}:IFriendRequestListProps)=>{

return<div>
    {
     friendRequests.length?    
     friendRequests.map((friendRequest:IFriendRequestInterface,index:number)=>(
        <FriendRequestCard friendRequest={friendRequest} key={index}/>
    ))
    :
    <div>No Requests Yet</div>
   }
</div>
}

export default ListFriendRequestsComponent