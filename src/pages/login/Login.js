import React,{useState} from "react";
import './login.css';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Comments from "../../components/comments/Comments";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer} from "react-toastify";
import { toast } from "react-toastify";
import { login } from "../../redux/actions";
import 'react-toastify/dist/ReactToastify.css';
const Login=(props)=>{
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const LoginUser = (e) =>{
        const userObject={
            name:userName,
            email:email,
            password:password
        }
        axios.post('https://localhost:7216/api/User/Login', userObject)
          .then((response) =>{
            console.log(response);
            
            // <Comments uid={userid} />
            console.log(response.data)
            console.log(response.data.length)
            if(response.data.length===0){
                console.log("a")
                toast.error('Invalid credentials!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            else{
            dispatch(login(response.data[0].uid))
            navigate('/home')
            }
          })
          .catch(function (error) {
           
            console.log(error);
        });
          e.preventDefault();
    }
    return (
        <div className="login">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
         <div className="login-card">
            <div className="login-left">
                <h1>Social Media</h1>
                <p>Let's connect</p>
                <span>Don't have an account?</span>
                <Button variant="primary" onClick={()=>navigate('/register')}>Register</Button>{' '}
                {/* <button onClick={()=>navigate('/register')}>Register</button> */}
                
            </div>
            <div className="login-right">
                 <h1>Login</h1>
                 <form onSubmit={(e)=>LoginUser(e)}>
                    <div className="login-input">
                    <input type="text" placeholder="Username" onChange={(e)=>setUserName(e.target.value)}/>
                    <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    <button type="submit">Login</button>
                    
                    
                 </form>
            </div>
         </div>
        </div>
    )
}
export default Login;