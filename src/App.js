
//BACKEND SERVER USED FOR THIS PROJECT IS NODE_TASK APP.JS


import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SignupPage2 from './pages/SignupPage2'
import LoginPage2 from './pages/LoginPage2'
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import ButtonComp from './components/ButtonComp'
import Dashboard from './components/Dashboard'

import Protected from './pages/Protected'
import HomePage from './pages/HomePage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getItems } from './reducers/itemSlice'
import { getCartItems } from './reducers/itemSlice'
import WishListPage from './pages/WishListPage'
import ParentLayout from './pages/ParentLayout'
import CardDetails from './pages/CardDetailsPage'
import { createContext } from 'react'
import { useState } from 'react'
import CartPage from './pages/CartPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ReqAuth from './pages/ReqAuth'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css'
import OrdersPage from './pages/OrdersPage'
import { getOrderedItems } from './reducers/itemSlice'



import './style.css'
import {toast} from 'react-toastify';


import './App.css';

export const CartContext=createContext()
export const UserContext=createContext()
export const searchContext=createContext()

function App() {
  
  const dispatch = useDispatch();
const [cartItems,setCartItems]=useState([])
const [userDetails,setUserDetails]=useState()
const [searchVal,setSearchVal]=useState()
// const navigate=useNavigate()

  useEffect(()=>{

    dispatch(getItems());


  }, [])


  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(()=>{
    dispatch(getOrderedItems());
  }, [])


  const refreshtoken=localStorage.getItem("refreshtoken")
  const details=localStorage.getItem("userdetails")
const parsedDetails=JSON.parse(details)
// console.log(parsedDetails)
// useEffect(()=>{
//     if(refreshtoken){
//       console.log(details)
//       axios.post("http://localhost:3008/userslist/login", parsedDetails)
//       .then((res)=>{
//           console.log(res)
//           const token = res.data.token
//           // const refreshtoken = res.data.refreshtoken
//           if(token){
            
//               // console.log(document.cookie.sessionCookie)
//               // console.log(res.cookie)
//               localStorage.setItem("token", token)
//               // localStorage.setItem('refreshtoken', refreshtoken)
//               // localStorage.setItem("userMail",values.email)
//               // console.log(values)
//               // console.log(userDetails)
//               // navigate("/parent/home")
           

//           }
  
//       })
//       .catch((err)=>{
//           console.log(err)
//           // alert("Unauthorised Access")
//       })
//     }
// },[])

  return (
   <>
    <UserContext.Provider value={[userDetails,setUserDetails]}>
   <CartContext.Provider value={[cartItems,setCartItems]}>
    <searchContext.Provider value={[searchVal,setSearchVal]}>
   
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<SignupPage2/>} />
   <Route path='/login1' element={<LoginPage/>}/>
   <Route path="/login" element={<LoginPage2/>} />
   
   {/* <Route path="/main" element={<Dashboard/>}> */}
  
   <Route path="home2" element={<Home/>} />

   <Route element={<Protected/>}>
   <Route path="/admin" element={<AdminPage />} />
   </Route>
   <Route path='/parent' element={<ParentLayout/>}>
   
   <Route path='home' element={<HomePage />} />
   <Route path='carddetails/:id' element={<  CardDetails/>}/>
  
   <Route element={<Protected/>}>
    <Route path='wishlist' element={<WishListPage/>}/>
    <Route path="admin/:id" element={<AdminPage />} />
    <Route path='admin' element={<AdminPage />} />
    <Route path='cartpage' element={<CartPage/>}/>
    <Route path='orderspage' element={<OrdersPage />}/>
   
    </Route>
    </Route>
    

  
   
   </Routes>
   </BrowserRouter>
   </searchContext.Provider>
   </CartContext.Provider>
   </UserContext.Provider>
   
   </>
  );
}

export default App;
