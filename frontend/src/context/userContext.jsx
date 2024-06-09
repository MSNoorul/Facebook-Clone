import { createContext,useContext, useState,useEffect } from "react";



const AuthContext = createContext();

export const useUsercontext = ()=>{
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser'))|| null);

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