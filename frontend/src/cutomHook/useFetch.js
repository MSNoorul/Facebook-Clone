import { useState,useEffect, useRef } from "react";


function useFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      else {
        const err = await res.json();
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
