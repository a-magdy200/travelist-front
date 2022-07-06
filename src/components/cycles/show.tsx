import  { useState , useEffect } from 'react';
import { useParams } from "react-router-dom";

const ShowCycle=()=>{
    const [cycle, setCycle] = useState<Cycle>();
    let {id} = useParams();
    interface Cycle {
        id: number;
        name:string;
        departure_date:string;
        arrival_date:string;
        departure_location:Country;
        arrival_location:Country;
       
    }
   
    interface Country {
      id: number;
      name: string;
      
    } 

  
    useEffect(() => {
      fetch('http://localhost:4000/cycles/show/'+id)
      .then(res => {
        return ( res.json());
      })
      .then(res => {
        console.log(res.data)
        setCycle(res.data)

       })
       .catch(e=>{
         console.log(e)
       })    },[])
    return(
   <div>

     <h1>{cycle?.name}</h1>
     <h1>{cycle?.id}</h1>

      
     </div>
    );
    
}
export default ShowCycle;
