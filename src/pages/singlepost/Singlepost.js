import React,{useState,useEffect} from "react";
import './singlepost.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deletePost, editPost, getspost } from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
const Singlepost=()=>{
    const user_id = useSelector(state=>state.operationReducer.uid)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {pid,uid}=useParams()
    const [category,setcategory]=useState("");
    const [details,setdetails]=useState("");
    const [img,setimg]=useState("");
    const [showUpdate,setShowUpdate]=useState("");
    const singlepost = useSelector(state=>state.postoperationReducer.singlePost)
    let postdata = singlepost[0];
    useEffect(()=>{
        dispatch(getspost(pid));
},[]);
    const handlePostEdit=()=>{

        const postObject={
            "pid": parseInt(pid),
            "uid": parseInt(user_id),
            "category": category,
            "details": details,
            "img": img,
            "timestamp": "new Date().toDateString()",
            "likes": 0,
            "views": 0
        }
        console.log(postObject)
        dispatch(editPost(postObject))
    }
    const handleDeletePost=()=>{
        axios.delete(`https://localhost:7216/api/Post?pid=${pid}&uid=${uid}`)
        .then(response => {
          console.log(response.data);
          navigate("/");
        })
        .catch(error => {
          console.error(error);
        });
    }
 
    
    return (
        <div>
            <button onClick={()=>console.log(postdata)}>click</button>
            <div className="spost">
                <text >{postdata?.category}</text>
                <text>{postdata?.details}</text>
                <img src={postdata?.img} alt="" />
                <text>{postdata?.timestamp}</text>
                <text>{postdata?.likes}</text>
                <text>{postdata?.views}</text>
                <text>{postdata?.pid}</text>
                <text>{postdata?.uid}</text>
            </div>
            <div className="handlePostEdit" onClick={()=>setShowUpdate(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
                {
                (showUpdate)?
                <div className="updateinput">
                <input type="text"  placeholder="Category"  onChange={(e)=>setcategory(e.target.value)}/>
                <input type="text"  placeholder="Details"  onChange={(e)=>setdetails(e.target.value)}/>
                <input type="text"  placeholder="Image Url"  onChange={(e)=>setimg(e.target.value)}/>
                <button onClick={handlePostEdit}>Update</button>  
                </div>:null
                 }
            </div>
            <div className="handlepostdelete" onClick={handleDeletePost}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
            </div>
        </div>
    )
}
export default Singlepost;