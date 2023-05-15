
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



import './App.css';

export const CartContext=createContext()

function App() {

  const dispatch = useDispatch();
const [cartItems,setCartItems]=useState([])



  useEffect(()=>{

    dispatch(getItems());


  }, [])


  useEffect(()=>{
    dispatch(getCartItems())
  })


  return (
   <>
   <CartContext.Provider value={[cartItems,setCartItems]}>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<SignupPage2/>} />
   <Route path="/login" element={<LoginPage2/>} />
    <Route path="/admin" element={<AdminPage />} />
   {/* <Route path="/main" element={<Dashboard/>}> */}
  
   <Route path="home2" element={<Home/>} />

   
   <Route path='/parent' element={<ParentLayout/>}>

   <Route path='home' element={<HomePage />} />
   <Route path='carddetails' element={<  CardDetails/>}/>
    <Route path='wishlist' element={<WishListPage/>}/>
    <Route path='cartpage' element={<CartPage/>}/>
    </Route>
    

  
   <Route element={<Protected />} >
    <Route path="button" element={<ButtonComp />} />
    </Route>
    {/* </Route> */}
   </Routes>
   </BrowserRouter>
   </CartContext.Provider>
   </>
  );
}

export default App;
