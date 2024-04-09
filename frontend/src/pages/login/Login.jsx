import { Link } from "react-router-dom";
import "./login.scss";
import { useState, useEffect } from "react";
import { useUsercontext } from "../../context/userContext";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import useFetch from "../../cutomHook/useFetch";
import CircularIndeterminate from "../../components/progress/circular";


const Login = () => {
  const [userData, setData] = useState({});
  const { setCurrentUser } = useUsercontext();
  const {loading ,error  ,fetchdata} = useFetch();


  //username:"noorul",password:"test123"
  useEffect(() => {
    console.log(import.meta);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
    fetchdata("/user/login" ,options,setCurrentUser)
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, username: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, password: e.target.value };
                });
              }}
            />
            <button onClick={handleLogin}>{
              loading?<CircularIndeterminate/>:"Login"
}</button>
          </form>
        </div>
      </div>
      {error && (
         <Snackbar
         open={!!error}
         autoHideDuration={3300} // Duration in milliseconds (adjust as needed)
         onClose={()=> error}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning at the top
       >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Login;
