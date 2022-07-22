import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface"
import { ISentRequestListProps } from "../../config/interfaces/ISentRequestListProps.interface"
import MySentRequestCard from "./mySentRequestCard"

const ListSentRequestsComponent=({mySentRequests}:ISentRequestListProps)=>{

return<div>
    {
     mySentRequests.length?    
     mySentRequests.map((mySentRequest:IFriendRequestInterface,index:number)=>(
        <MySentRequestCard mySentRequest={mySentRequest} key={index}/>
    ))
    :
    <div>No Requests Yet</div>
   }
</div>
}

export default ListSentRequestsComponent