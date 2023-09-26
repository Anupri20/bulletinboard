import React, { useEffect, useState } from "react";
import './Posts.css';
import axios from "axios";
import Postcomp from "../postcomp/Postcomp";
import Comments from "../comments/Comments";
import Singlepost from "../../pages/singlepost/Singlepost";
import { getposts } from "../../redux/actions";
import { useDispatch ,useSelector} from "react-redux";
const Posts=(props)=>{
  const dispatch=useDispatch();
    const [renderPost,setRenderPost] = useState(0)
    const postdata = useSelector(state=>state.postoperationReducer.post)
    const updatePost = () =>{
      setRenderPost(postdata+1)
    }
    useEffect(()=>{
     dispatch(getposts())
    },[renderPost]);
    const test = () =>{
      console.log(props.uid)
    }
    return(
        <div className="posts">
          <button onClick={test}>click</button>
          {postdata.map(post=>(
            <div className="post">
                <Postcomp post={post} uid={props.uid} setRenderPost={()=>updatePost()}/>
                {/* <Comments pid={post.pid} uid={props.uid}/> */}
                {/* <Singlepost pid={post.pid}/> */}
            </div>
          ))}
        </div>
    )
}
export default Posts;