import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {items:[], status:"",cartItems:[]}
const token = localStorage.getItem("token")
const email=localStorage.getItem("userMail")

export const getItems = createAsyncThunk("getItems", async ()=>{
    const response = await axios.get("http://localhost:3008/items", {
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    // console.log(response.data)
    return response.data;

})

export const getCartItems = createAsyncThunk("getCartItems", async ()=>{ 
    const response = await axios.get("http://localhost:3008/cart/getallitems/"+email)
        
   console.log(email)
     
    console.log(response.data)
    return response.data;
})


const itemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
       
    },
    extraReducers(builder){
        builder
        .addCase(getItems.pending, (state,action)=>{
            state.status = "Loading"
        })
        .addCase(getItems.fulfilled, (state, action)=>{
            state.status="Succeeded"
            // state.items = state.items.concat(action.payload)
            state.items = action.payload
        })
        .addCase(getItems.rejected, (state, action)=>{
            state.status = "failed"
        })
        .addCase(getCartItems.pending, (state,action)=>{
            state.status = "Loading"
        })
        .addCase(getCartItems.fulfilled, (state, action)=>{
            state.status="Succeeded"
            // state.items = state.items.concat(action.payload)
            state.cartItems = action.payload
        })
        .addCase(getCartItems.rejected, (state, action)=>{
            state.status = "failed"
        })
       
    }
})

export default itemsSlice.reducer;