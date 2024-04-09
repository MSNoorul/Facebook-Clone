import { useEffect, useState } from "react";
import FriendsList from "../../components/friendsList/FriendList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../cutomHook/useFetch";
import { useUsercontext } from "../../context/userContext";
import Sidebar from "../../components/sidebar/Sidebar";
import './followers.scss'


function Followers() {
    const {fetchdata} = useFetch();
    const {currentUser} = useUsercontext();
    const [followers ,setFollowers] = useState([])

    useEffect(()=>{
        const url = "/user/followers/"+ currentUser._id;
        fetchdata(url,setFollowers);
    },[])

    return ( 
        <div className="followers">
            <Navbar/>
            <div className="followersWrapper">
                <Sidebar/>
                <div className="friendList">
                <FriendsList data={followers} title={'Followers'}/>
                </div>
               
            </div>
        </div>
     );
}

export default Followers;
