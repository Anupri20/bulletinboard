import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Bootstrap } from "react-bootstrap";
import axios from "axios";
import './createpost.css';
const Createpost=()=>{
    const {uid}=useParams()
    const [pid,setpid]=useState("")
    const [category,setcategory]=useState("")
    const [details,setdetails]=useState("")
    const [img,setimg]=useState("")
    const [timestamp,settimestamp]=useState("")
    const [likes,setlikes]=useState("")
    const [views,setviews]=useState("")
    const create=(e)=>{
        const postObject={
            "pid": 0,   
            "uid": uid,
            "category": category,
            "details": details,
            "img": img,
            "timestamp": new Date(),
            "likes": 0,
            "views": 0
        }
        axios.post('https://localhost:7216/api/Post', postObject)
          .then((response) =>{
            console.log(response);
          })
          .catch((error)=>console.log(error))
          e.preventDefault();
        e.preventDefault();

    }
    return(
        <div className="createpost">
            <div className="createpostcard">
               
                <div className="form">
                <h2>New Post</h2>
                    <form onSubmit={(e) => create(e)}>
                        <div class="form-group">
                            <label for="exampleInputPassword1"></label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter category" onChange={(e) => setcategory(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"></label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter post details" onChange={(e) => setdetails(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"></label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter image url" onChange={(e) => setimg(e.target.value)} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Createpost; 