import { useState } from "react";
import { useUsercontext } from "../context/userContext";

function useFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {setCurrentUser} = useUsercontext();

  const fetchdata = async (urlStr,option = {},callback) => {
 
    const url = import.meta.env.VITE_API_URL + urlStr;

    // if user pass second argument as a callback 
    if(typeof(option) == "function"){
      callback = option;
        option ={};
     }

     // server request

     try {
      setLoading(true);
      const res = await fetch(url, option)
      if(res.ok){
        const data = await res.json()
        callback(data)
      }
      // middlware for refresh token
      // else if(res.status == 403){
      //   const acctoken = await refreshToken() // middleware to refresh the token
      //   console.log(acctoken);
      //   if(acctoken){
      //     // fetchdata(urlStr,option = {},callback)
      //   }
      //   else{
      //     //login limit expires
      //   }
      // }
      else {
        const err = await res.json();
        if(err.message == 'Token expired') {
          err.message = 'Token Expired Login Again';
          setTimeout(() => {
            sessionStorage.removeItem('currentUser')  
            setCurrentUser(null)     
          }, 5000);
        }
        throw new Error(`${res.status} ${err.message}`)
      }
     }
     catch(e){
      setError(e.message)
     }
     finally {
      setLoading(false);
      setTimeout(()=>{setError(null)},3000)}
     }

  return {loading , error  , fetchdata}

}

export default useFetch;
