

//BACKEND FILE USED IN THIS PROJECT IN NODE_TASK APP.JS


import React from 'react'


import Card from 'react-bootstrap/Card';

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect,useContext } from "react"
import { UserContext } from '../../App';
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import './index.css'


  const Index = () => {
    const navigate = useNavigate();
    const [userlogged, setUserLogged] = useState("");
    const [userDetails,setUserDetails]=useContext(UserContext);
    

    useEffect(()=>{
        axios.get("http://localhost:3008/userslist")
        .then((res)=>{
            console.log(res)
            // console.log(res.cookie)
           
        })
       .catch((err)=>{
        console.log(err)
       })
    }, [])

    function goToSignupPage(){
        navigate("/")
    }

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:"",
            
        },
        enableReinitialize:true,
        validationSchema: Yup.object({
          username: Yup.string()
            .min(3, "should be more than 3 characters")
            .max(150, "Must be 150 characters or less")
            .required("Required"),
         email:Yup.string()
         .email()
         .required("Required"),

          password: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
       
          
        }),
        onSubmit: (values) => {
            
       console.log("Form Submitted")
        console.log(values)
       setUserDetails(values)
    
        localStorage.setItem("userdetails", JSON. stringify(values))
            axios.post("http://localhost:3008/userslist/login", values)
            .then((res)=>{
                console.log(res)
                const token = res.data.token
                const refreshtoken = res.data.refreshtoken

                if(token){
                    setUserLogged("Login success")
                    // console.log(document.cookie.sessionCookie)
                    // console.log(res.cookie)
                    localStorage.setItem("token", token)
                    localStorage.setItem('refreshtoken', refreshtoken)
                    localStorage.setItem("userMail",values.email)
                    // console.log(values)
                    // console.log(userDetails)
                    navigate("/parent/home")


                }
        
            })
            .catch((err)=>{
                console.log(err)
                // alert("Unauthorised Access")
            })
      }
    })
 
  return (
    <>
    <Container>
        <Row>
            <Col>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Login Page</h1>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value = {formik.values.username}
                onChange={formik.handleChange}
                placeholder='Enter Username'
              />
              <Form.Text className='text-danger'>
                {formik.touched.username && formik.errors.username ? (
                  <div className='text-danger'>{formik.errors.username}</div>
                ) : null}
              </Form.Text>
            </Form.Group> 


            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value = {formik.values.email}
                onChange={formik.handleChange}
                placeholder='Enter Email'
              />
              <Form.Text className='text-danger'>
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-danger'>{formik.errors.email}</div>
                ) : null}
              </Form.Text>
            </Form.Group> 
            

            
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='text'
                name='password'
                value = {formik.values.password}
                onChange={formik.handleChange}
                placeholder='Enter Password'
              />
              <Form.Text className='text-danger'>
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-danger'>{formik.errors.password}</div>
                ) : null}
              </Form.Text>
            </Form.Group> 
            <Button variant='primary' type='submit'>
              Login
            </Button>


            <p className="errors">{userlogged}</p>

            <div className="d-flex">
            <p>Not Registered Yet?</p>
            <Button variant='primary' onClick={goToSignupPage}>
             Register
            </Button>
            </div>      
           
            </Form>
            </Col>
        </Row>
    </Container>

    </>
  )
}
  
  


export default Index;