import { Link ,useNavigate} from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularIndeterminate from "../../components/progress/circular";
import useFetch from "../../cutomHook/useFetch";

const Register = () => {
  const [userData, setData] = useState({});
  const {loading ,error  ,fetchdata} = useFetch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
    // server request

    const callback = (data)=>{console.log(data);navigate("/login")}

    fetchdata("/user/register",options,callback)

     
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Face Book</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, username: e.target.value };
                });
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, email: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, password: e.target.value };
                });
              }}
            />
            <input type="text" placeholder="Repeat Password" />
            <button type="submit">{
               loading?<CircularIndeterminate/>:"Register"
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

export default Register;
