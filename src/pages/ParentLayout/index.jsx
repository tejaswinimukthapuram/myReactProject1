import React from 'react'
import { Outlet } from 'react-router-dom'
import PirmaryNav from '../../components/PrimaryNav'
import { useState } from 'react'
// import updateSearchTerm from '../HomePage'
import { useContext } from 'react'
import { searchContext } from '../../App'
const Index = () => {
  // const [term, setTerm] = useState("");
  // const [searchVal,setSearchVal]=useContext(searchContext)

  // const updateSearchTerm = (val) => {
  //   // console.log(val);
  //   // console.log("SearchTermUpdated");
  //   // setTerm(val);
  //   setSearchVal(val);

  // };


  return (
    <>
     {/* <PirmaryNav  /> */}
    <Outlet/>
    </>
    
  )
}

export default Index;