import  { useState , useEffect } from 'react';

const Show=()=>{
    const [program, setProgram] = useState()
    useEffect(() => {
      fetch('http://localhost:4000/programs/show/1')
      .then(res => {
        return res.json()
      })
      .then(res => {
        setProgram(res.data);
        console.log(res.data)
       })
       .catch(e=>{
         console.log(e)
       })    },[])
    return(
   <div>
     <h1>{program}</h1>
   </div>
    );
    
}
export default Show;
