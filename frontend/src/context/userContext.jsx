import { createContext,useContext, useState,useEffect } from "react";


const intialState = {
  Status: "single",
city: "chennai",
coverPicture: {public_id: "fb_clone_coverPictures/h6lhfsw98bfq2xjsgp6l"},
email: "noorul@gmail.com",
followers: [],
following: [],
phone: 8760408029,
profilePicture: {public_id: "fb_clone_profiles/jcx63lzucaxebxalj2am"},
username: "Noorul Ameen",
_id: "660ff1ca2b4c0975b13482d3"
}

const AuthContext = createContext();

export const useUsercontext = ()=>{
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser'))|| intialState);

useEffect(() => {
  sessionStorage.setItem('currentUser',JSON.stringify(currentUser))
  
}, [currentUser]);

const [posts, setPost] = useState([]);

  return (
    <AuthContext.Provider value={{ currentUser,setCurrentUser ,posts , setPost}}>
      {children}
    </AuthContext.Provider>
  );
};