import * as React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import environment from '../../environment';
import axios from 'axios';
import {Typography } from "@mui/material";

export default function HalfRating(props) {
    const {eachItem} = props;
    const onRatingChange = (e)=>{
        console.log(e.target.value)
        axios.put(`${environment.api}/items/${eachItem._id}`, {rating:e.target.value}, {
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    }
  return (
   
    <Stack space={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} component="legend" style={{color:"#ff4081", top:'10px',}}
        // size="small"
      onChange={onRatingChange} />
     
    </Stack>

 
  );
}




