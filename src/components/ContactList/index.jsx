import React from 'react'
import { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Index = () => {

    const [usersData, setUsersData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3008/userslist")
        .then((res)=>{
            console.log(res.data)
            setUsersData(res.data)
        })
    }, [])

function goToChatPage(id){
    navigate("/main/chatpage");
}

  return (
  <>
  <div>
  <List>
   {usersData.map((each, index)=>{
    return (
        
    <ListItem key={index}>
        <ListItemButton   onClick={()=>goToChatPage(each._id)}>
        <ListItemIcon><PermIdentityIcon/></ListItemIcon>
        <ListItemText primary={each.username} /> 
        </ListItemButton>
    </ListItem>
   
    )
   })}

</List>
   
  </div>
  </>
  )
}

export default Index