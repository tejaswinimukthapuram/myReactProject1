import React from 'react'
import decode from 'jwt-decode'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Card,Row,Container,Col } from 'react-bootstrap'
import './index.css'


export const Log = ()=>{
const navigate=useNavigate()

const goToLoginPage=()=>{
  navigate('/login')
}



  return(
  <>

  <Container>
    <Row>
      <Col sm="12">
        <div className='d-flex flex-row justify-content-center align-items-center'style={{height:'100vh'}}>
        <Card className='login-container'>
      <h3>Please Login</h3>
  
  <button onClick={goToLoginPage} className='btn'>Login</button>
      </Card>
        </div>
     
      </Col>
    </Row>
  </Container>
 
  </>
  )
}

const Index = () => {

  const navigate = useNavigate();
const token = localStorage.getItem("token")
// const decodedToken = decode(token)
//  console.log(token)
// console.log(decodedToken)


  return (
    <>

    {token?<Outlet />:<Log/>}
    </>
   
  )
}

export default Index;