import React, { useState,useEffect } from "react";
import './comments.css';
import axios from "axios";
import Commentdetails from "../commentdetails/commentdetails";

const Comments=(props)=>{
    // const [uid,setuid]=useState("")
    // const [pid,setpid]=useState("")
    const [cdetails,setcdetails]=useState("")
    const [timestamp,settimestamp]=useState("")
    const test = () =>{
        console.log(props.uid)
        console.log(props.pid)
    }
    const CreateComments=(e)=>{
    
    const commentObject={
        "cid":0,
        "uid":props.uid,
        "pid":props.pid,
        "cdetails":cdetails,
        "timestamp":new Date()
    }
          axios.post('https://localhost:7216/api/Comment', commentObject)
          .then((response) =>{
            console.log(response);
          })
          .catch((error)=>console.log(error))
         e.preventDefault();
    }
    const [commentdetails,setcommentdetails]=useState("")
    const [commenttimestamp,setcommenttimestamp]=useState(false)
   
    const [commentdata,setcommentdata]=useState([])
  

    useEffect(()=>{
        console.log(props.pid)
    axios.get(`https://localhost:7216/api/Comment/postcomment ${props.pid}`,{
        params:{pid:props.pid}
    })
  .then(function (response) {
    console.log(response)
    setcommentdata(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
},[cdetails]);

    return(
        <div className="comments">
            <button onClick={test}>click</button>
            <div className="write">
             <input type="text" placeholder="write a comment" onChange={(e)=>setcdetails(e.target.value)}/>
             <button onClick={(e)=>CreateComments(e)}>Send</button>
            </div>
           
            {commentdata.map(comment=>(
                <Commentdetails comment={comment} pid={props.pid}/>
                
            ))
        }

        </div>
    )
    
}
export default Comments;