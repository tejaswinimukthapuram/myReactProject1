import React from 'react'
import decode from 'jwt-decode'
import { Outlet } from 'react-router-dom'

const Index = () => {

const token = localStorage.getItem("token")
const decodedToken = decode(token)

console.log(token)
console.log(decodedToken)

  return (
    <>
    {token?<Outlet />:<p>You are not authorized</p>}
    </>
   
  )
}

export default Index;