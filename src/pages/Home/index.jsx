import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import axios from 'axios'
import {getData} from '../../components/ButtonComp'

import  './index.css'

// const data1 = await  axios.get('http://localhost:3000/todos')  //only at top level that is not inside any function, we can use await without async 


const Index =  () => {

  const list = ["Apple", "Cat", "Elephant", "Mango", "guntur", "resort", "banglore", "sandwich", "hyderabad"]
const [data, setData] = useState(list)
const [searchTerm, setSearchTerm] = useState("");

const  [isSorted, setIsSorted] =  useState(true);

// console.log(data1)


useEffect(()=>{
  axios.get("https://fakestoreapi.com/products")
  .then((res)=>console.log(res.data))
  .catch((err)=>console.log(err))
})

function onSort(){
 
  console.log("Data is sorted")
  if(isSorted){
    
    const  data1 = data.sort((a, b) =>{
     return a.toLowerCase() > b.toLowerCase()?1:-1}
    );
    setData(data1)
  }else{
    const  data2 = data.sort((a, b) =>{
return b.toLowerCase() > a.toLowerCase() ?1:-1
    }
      
    );
    setData(data2)
  }

  setIsSorted(!isSorted)
 
}

  const onSearch = (event)=>{
  setSearchTerm(event.target.value);
  if(searchTerm===""){
    setData(list)
    console.log(data)
    //setFilteredData(data)
  
  }
    console.log(searchTerm);
    let filteredItems = list.filter((each)=>{
       return each.toLowerCase().includes(searchTerm.toLowerCase())
      // return each.toLowerCase().indexOf(searchTerm.toLowerCase()) !=-1
      
    })
    setData(filteredItems);
  
    



   

    // setFilteredData(filteredItems)

 

  }


 

  return (
    <>
 <div>This is Home Component</div>

 <button className="btn btn-primary"  onClick={onSort}>Sort</button>


     <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
{/* 
     <input type="search" value={searchTerm} onChange={onSearch}/> */}

     <ul>
      {data.filter((each)=>{  return each.toLowerCase().includes(searchTerm.toLowerCase())}).map((each)=>{
        return <li key={each}>{each}</li>
      })}

{data.map((each)=>{
        return <li key={each}>{each}</li>
      })}
     </ul>

   
    </>
   
  )
}

export default Index;