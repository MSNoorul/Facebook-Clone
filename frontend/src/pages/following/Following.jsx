import { useEffect, useState } from "react";
import FriendsList from "../../components/friendsList/FriendList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../cutomHook/useFetch";
import { useUsercontext } from "../../context/userContext";
import './following.scss'
import Sidebar from "../../components/sidebar/Sidebar";

function Following() {
    const {fetchdata} = useFetch();
    const {currentUser} = useUsercontext();
    const [following ,setFollowing] = useState([])

    useEffect(()=>{
        const url = "/user/following/"+ currentUser._id;
        fetchdata(url,setFollowing);
    },[])
    return ( 
       <div className="following">
        <Navbar/>
        <div className="followingWrapper">
            <Sidebar/>
            <div className="friendList">
            <FriendsList data={following} title={"Following"}/>
            </div>
          
        </div>
       </div>
     );
}

export default Following;