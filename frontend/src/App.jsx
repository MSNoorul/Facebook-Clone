import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./style/dark.scss";
import "./App.scss"
import { Suspense, useContext ,useEffect ,lazy} from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useUsercontext } from "./context/userContext";
import CircularIndeterminate from "./components/progress/circular";
import '@mui/material/styles';
import useFetch from "./cutomHook/useFetch";



const Home = lazy(()=> import('./pages/home/Home'));
const EditProfile = lazy(()=> import('./pages/editProfile/EditProfile'));
const Profile = lazy(()=> import('./pages/profile/Profile'));
const Followers = lazy(()=> import('./pages/followers/Followers'));
const Following = lazy(()=> import('./pages/following/Following'));



function App() {
  const { currentUser,setCurrentUser } = useUsercontext();
  const { darkMode } = useContext(DarkModeContext);
  const {loading ,error  ,fetchdata} = useFetch();

  useEffect(()=>{console.log(currentUser);},[currentUser])

  useEffect(() => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username:'Noorul Ameen',password:'test123'}),
      }
      const callback = (data)=>{
        setCurrentUser(data);
        window.confirm("Your loged in as Noorul Ameen is a default User")
      }
      fetchdata("/user/login" ,options,callback)
  }, []);

  if(loading){
    window.alert("This is a free server that may take a few seconds to start. Please wait.")
    return <div style={{height:'100vh'}}><CircularIndeterminate Iconsize={40}/></div>
  } 
  if(error) {
    window.confirm(error+" Please try again later. Thank you for your interest in visiting my website.")
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Suspense fallback={<div style={{height:'100vh'}}><CircularIndeterminate Iconsize={40}/></div>}>
        <Routes>
  
          <Route path="/">
         
            <Route path="login" element={currentUser?<Navigate to ='/home'/>:<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={currentUser?<Home/>:<Navigate to='/register' />} />
            <Route index element={<Home/>} />
            <Route path="profile">
              <Route path=":userId" element={currentUser?<Profile />:<Navigate to={'/login'}/>} />
              <Route path=":userId/edit" element={currentUser?<EditProfile />:<Navigate to={'/login'}/>} />
            </Route>
            <Route path="friends">
              <Route path="followers" element={currentUser?<Followers />:<Navigate to={'/login'}/>} />
              <Route path="following" element={currentUser?<Following />:<Navigate to={'/login'}/>} />
            </Route>
           
          </Route>

        </Routes>
        </Suspense>
 
    </div>
  )
}

export default App;
