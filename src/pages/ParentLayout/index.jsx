import React from 'react'
import { Outlet } from 'react-router-dom'
import PirmaryNav from '../../components/PrimaryNav'
const Index = () => {
  return (
    <>
     <PirmaryNav/>
    < Outlet />
    </>
    
  )
}

export default Index;