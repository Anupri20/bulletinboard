import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import axios from "axios";

import './postcomp.css';
const Postcomp = ({ post, uid,setRenderPost }) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const [likeAction, setLikeAction] = useState(false)
    const [likes, setlikes] = useState("")
    const [views, setviews] = useState("")
    const handlelikes = () => {
        setRenderPost()
        setLikeAction(true)
        const likeObject = {
            "likes": 0,
            "pid": post.pid
        }
        axios.put(`https://localhost:7216/api/Post/Likes`, likeObject)
            .then(response => {
                console.log(response.data);
                setviews(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleViews = () => {
        const viewsObject = {
            "views": 0,
            "pid": post.pid
        }
        axios.put('https://localhost:7216/api/Post/Views', viewsObject)
            .then(response => {
                console.log(response.data);
                setlikes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div className="postcomp">
            <div className="container">
                <div className="post-user">
                    <div className="userinfo">
                        <img src={post.img} alt="" />
                        <div className="user-details">
                            <Link to={'/profile/${post.userId}'} style={{ textDecoration: "none", color: "inhertit" }}>
                                <span>{post.name}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="post-content">
                    <p>{post.details}</p>
                    <Link to={`/singlepost/${post.pid}/${uid}`}>
                        <img src={post.img} alt="" onClick={handleViews} className="imgpost"/>
                    </Link>
                </div>
                <div className="post-info">
                    <div className="item-like" onClick={handlelikes} >
                        {likeAction ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>}
                        {post.likes} Likes
                    </div>
                    <div className="item-comment" onClick={() => setCommentOpen(!commentOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                        </svg>

                    </div>
                    <div className="postviews">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                        {post.views} Views
                    </div>

                </div>
                {commentOpen && <Comments pid={post.pid} uid={uid} />}
            </div>

        </div>
    )
}
export default Postcomp;

