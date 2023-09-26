import React from "react";
import './home.css';
// import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import { useNavigate } from "react-router-dom";
const Home=(props)=>{
    const navigate=useNavigate();
    return(
        <>
         <Navbar/> 
         <Posts uid={props.uid}/>
         <div className="home">
            <button onClick={()=>navigate(`/createpost/${props.uid}`)}>+</button>
        </div> 
        
        </>
    )
}
export default Home;