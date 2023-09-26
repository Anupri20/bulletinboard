
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Registration from './pages/registration/Registration';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Createpost from './pages/Createpost/Createpost';
import Singlepost from './pages/singlepost/Singlepost';
import { useState } from 'react';
function App() {
  const [uid,setUid] = useState()
  const setUserId = (id) =>{
    setUid(id)
    console.log(id)
  }
  const currentUser=false;
  const Layout=()=>{
    return(
      <div>
        <Navbar/>
        <div style={{display:'flex'}}>

        </div>
      </div>
    )
  }
  const ProtectedRoute=({Profile})=>{
    if(!currentUser){
      return <Navigate to='/login' />
    }
  }
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home uid={uid}/>}/>
        <Route path='/' element={<Login setUserId={setUserId}/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/createpost/:uid' element={<Createpost/>}/>
        <Route path='/singlepost/:pid/:uid' element={<Singlepost/>}/>
      </Routes>
    </BrowserRouter>
    {/* <Login /> */}
    </div>
  );
}

export default App;
