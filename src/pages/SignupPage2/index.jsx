import React from 'react'


import Card from 'react-bootstrap/Card';

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './index.css'


  const Index = () => {
    const navigate = useNavigate();
    const [userExist, setUserExist] = useState("");

    function goToLoginPage(){
        navigate("/login")
    }

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:"",
            number:""
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
            // number: Yup.number()
            // .typeError("That doesn't look like a phone number")
            // .positive("A phone number can't start with a minus")
            // .integer("A phone number can't include a decimal point")
           
            // .required('A phone number is required')
            // .max(10),
        }),
        onSubmit: (values) => {
          
            axios.post("http://localhost:3008/userslist", values)
            .then((res)=>{
                console.log(res)
                // const token = res.data.token
                // if(token){
                //     localStorage.setItem("token", token)
                //     navigate('/');
                // } 
                setUserExist(res.data)
                // if (res.data==="User Already exist"){
                //     setUserExist(res.data)
                // }else{
                //     setUserExist("You have registered Successfully Please Login")
                // }
                
              // console.log(res.data)
                
               
            })
            .catch((err)=>{
                console.log(err)
                // alert("Unauthorised Access")
            })
       console.log("Form Submitted")
      }
    })
    
  return (
    <>
    <Container>
        <Row>
            <Col>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Sign Up Page</h1>
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
            
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type='text'
                name='number'
                value = {formik.values.number}
                onChange={formik.handleChange}
                placeholder='Enter mobile number'
              />
              <Form.Text className='text-danger'>
                {formik.touched.number && formik.errors.number ? (
                  <div className='text-danger'>{formik.errors.number}</div>
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
              Submit
            </Button>

            <p className="errors">{userExist}</p>

            <div className="d-flex">
            <p>Already a user?</p>
            <Button variant='primary' onClick={goToLoginPage}>
              Login
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