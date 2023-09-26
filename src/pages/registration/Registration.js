import React,{useState} from "react";
import './registration.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
const Registration=()=>{
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const RegisterUser = (e) =>{
        const userObject={
            "name": userName,
            "email": email,
            "password": password,
            "uid": 0,
            "phone": phone,
            "img": "string"
          
        }
        axios.post('https://localhost:7216/api/User', userObject)
          .then((response) =>{
            console.log(response.data);
            navigate('/login')
          })
          .catch((error)=>console.log(error))
          e.preventDefault();
    }
    return(
        <div className="registration">
         <div className="register-card">
            <div className="register-left">
                <h1>Social Media</h1>
                <p>Let's connect</p>
                <span>Already have an account?</span>
            
                <button onClick={()=>navigate('/')}>Login</button>
                
            </div>
            <div className="register-right">
                 <h1>Register</h1>
                 <form onSubmit={(e)=>RegisterUser(e)}>
                    <div className="register-input">
                    <input type="text" placeholder="Username"  onChange={(e)=>setUserName(e.target.value)}/>
                    <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="number" placeholder="Phone No" onChange={(e)=>setPhone(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    <button type="submit">Register</button>
                    
                    
                 </form>
            </div>
         </div>
        </div>
    )
}
export default Registration;