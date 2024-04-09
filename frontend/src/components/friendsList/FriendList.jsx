import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemSecondaryAction  from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import './FriendList.scss'

export default function FriendsList({data ,title}) {
    console.log("data",data)
  return (
    <List className='friendList' sx={{ width: '100%', maxWidth: 1920, bgcolor: 'background.paper' ,margin:'0px auto',height:'calc(100vh - 56px)'}}>
      <Typography variant="h5" component="h2" gutterBottom margin={1.5}>
        {title}
      </Typography>
        {
            data.map((user , index)=>{
              return (
                <div key={index}>
                <ListItem alignItems="flex-start" >
               <ListItemAvatar>
                 <Avatar alt="Remy Sharp" src={user.profilePicture?.url || "/assets/DefaultProfile.jpg"} />
               </ListItemAvatar>
               <ListItemText
                 primary={user.username}
                 secondary={
                   <React.Fragment>
                     <Typography
                       sx={{ display: 'inline' }}
                       component="span"
                       variant="body2"
                       color="text.primary"
                     >
                      {user.city}
                     </Typography>
              
                   </React.Fragment>
                 }
               />
                 <ListItemSecondaryAction>
       {/* Chat icon button */}
       <IconButton edge="end" aria-label="chat" className='iconButton' >
         <ChatIcon />
       </IconButton>
     </ListItemSecondaryAction>
             </ListItem>
        {data.length != (index+1 ) && <Divider variant="inset" component="li" />}
               </div>

              )
              
            })
        }
     
     
    </List>
  );
}