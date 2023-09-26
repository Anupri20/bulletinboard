import React, { useState,useEffect } from "react";
import './navbar.css';
import { Link} from "react-router-dom";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Profile from "../../pages/profile/Profile";
import axios from "axios";
import { SignalWifiStatusbarNullOutlined } from "@mui/icons-material";

const Navbar=()=>{
  const[category,setcategory]=useState([]);
  const [showList,setShowList] = useState(false);
   const getcategory=()=>{
    axios.get('https://localhost:7216/api/Post/category')
  .then(function (response) {
    console.log(response.data)
    setcategory(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  if(showList==false){
    setShowList(true)
  }
  // else{setShowList(false)}
}
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span>Social</span>
       
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
        </svg>
          <div className="category" onClick={getcategory}>
           
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                    
            </svg>
            {
              (showList)?
              <select name="category" title="abc">
              {category.map((item) => (
                <option key={item.id} value={item.category} >
                  {item.category}
                </option>
              ))}
            </select>:null
            }
            
          </div>
        <div className="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
            <input type='text' placeholder="Search..." className="input"/>
           </div>
           </div>
      <div className="navbar-right">
        <Link to='/profile' className="profile-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
          </svg></Link>
{/* <div>
{profileOpen?
<Routes>
 <Route path='/profile' element={<Profile/>}/></Routes>:
 <></>}
</div> */}
           <div className="user">
             <img src="https://images.pexels.com/photos/5158956/pexels-photo-5158956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="img"/> 
            <span>Anushka</span>
           </div>
           </div>
        </div>
    )
}
export default Navbar;