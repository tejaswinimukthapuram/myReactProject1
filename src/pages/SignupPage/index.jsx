import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import './index.css'

function BasicExample() {

const [formValues, setFormValues] = useState({email:"", password:"", number:""});
const [formErrors, setFormErrors] = useState({});

  function onSubmitForm(event){
    event.preventDefault()
    setFormErrors(validate(formValues))
    console.log(formValues);
    console.log(formErrors)
   
    if(Object.keys(formErrors).length===0){
    
      console.log("Form Submitted Successfully")
    }
    
  }


  function onHandleChange(event){
       console.log(event.target.value);
   setFormValues({...formValues, [event.target.name]:event.target.value})
 
    console.log(formValues);
    setFormErrors(validate(formValues))
  }

  function validate(formValues){
    const errors ={}
    const numRegex = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
    if(!formValues.email){
      errors.email = "Please Enter Email"
    }
    else if(!formValues.email.includes("@")){
      errors.email = "Please Enter a valid Email Address"
    }
    if(!formValues.password){
      errors.password = "Please Enter Password"
    }
    else if(formValues.password.length<3){
      errors.password = "Password must be atleast 6 characters"
    }
    else if(formValues.password.length>10){
      errors.password = "Password must not exceed 10 characters"
    }
    else if(!formValues.password.includes("@")){
      errors.password = "Password should consists of one special character"
    }
    if(!formValues.number){
      errors.number= "Please Enter Mobile number"
    }
    else if(numRegex.test(formValues.number)){
      errors.number = "Enter a valid 10 digit mobile number"
    }
    
  
    return errors
  }

 

  return (
    <>
   
    <div className="d-flex flex-column justify-content-center align-items-center main-container">

      <h1>Sign up Page</h1>
  

    <Card style={{ width: '18rem', padding:"10px", margin:"10px"}}>

    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={onHandleChange}/>
        <Form.Text className="text-muted">  
          We'll never share your email with anyone else.
        </Form.Text>
        <p className="errors">{formErrors.email}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password" onChange={onHandleChange}/>
        <p className="errors">{formErrors.password}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" placeholder="Mobile number"  name="number" onChange={onHandleChange}/>
        <p className="errors">{formErrors.number}</p>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Card>
    </div>
    </>
  );
}

export default BasicExample;