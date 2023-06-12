import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./index.css";

const Index = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);

    const [file, setFile] = useState("")
    const token = localStorage.getItem('token')

    function convertToBase64(file){
      return new Promise((resolve, reject)=>{
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file);
          fileReader.onload = ()=>{
              resolve(fileReader.result)
          }
          fileReader.onerror = (error)=>{
              reject(error)
          }
      })
   }

   async function handleFileUpload(e){
    const file = e.target.files[0];
    // console.log(file);
    const base64 = await convertToBase64(file)
    // console.log(base64);
    setFile(base64);
    console.log(file)
   }

  const defaultValues = {
    title: "",
    description: "",
    price:0,
    gender:"",
    category: "",
    image: "",
  };
  const [item,setItem] = useState(defaultValues);

useEffect(()=>{
  if(!id){
   console.log("Id is not present")
  }else{
    console.log("Hello");
    axios.get('http://localhost:3008/items/'+id)
    .then((res)=>{
       console.log(res.data)
      const temp = {...defaultValues, ...res.data[0]}
      setItem(temp)
    })
    .catch((err)=>console.log(err))
  }
}, []);

console.log(item)
  const formik = useFormik({
    initialValues: item,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "should be more than 3 characters")
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      description: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(1000, "Must be 1000 characters or less")
        .required("Required"),

      category: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(1000, "Must be 1000 characters or less")
        .required("Required"),

       gender: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(1000, "Must be 1000 characters or less")
        .required("Required"),

        price: Yup.number()
        // .min(3, "Must be  3 characters or more")
        // .max(1000, "Must be 1000 characters or less")
        .required("Required"),

      image: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(500, "Must be 500 characters or less")
        .required("Required")
        .url('Invalid image URL'), //we can do the same in javascript as (/\.(jpeg|jpg|gif|png)$/i).test(imageUrl)
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
     console.log("item is being posted")
     if(id){
      axios
      .put("http://localhost:3008/items/"+id, values, {
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      .then(function (response) {
        console.log(response);
        navigate("/parent/home");
      })
      .catch(function (error) {
        console.log(error);
      });
     }else{
      axios
      .post("http://localhost:3008/items", values, {
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      .then(function (response) {
        console.log(response);
        navigate("/parent/home");
      })
      .catch(function (error) {
        console.log(error);
      });
     }
      
    },
  });

  return (
    <>
      <Container>
        <Row>
          <Col sm="12">
            <Card className="card1 m-5">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="label">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Enter Title"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-danger">{formik.errors.title}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label className="label">Gender</Form.Label>
                  <Form.Control
                    type="text"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    placeholder="Enter Gender"
                  />
                  <Form.Text className="text-danger ">
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-danger">
                        {formik.errors.gender}
                      </div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label className="label">Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    placeholder="Enter Category"
                  />
                  <Form.Text className="text-danger ">
                    {formik.touched.category && formik.errors.category ? (
                      <div className="text-danger">
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label className="label">Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    placeholder="Enter Price"
                  />
                  <Form.Text className="text-danger ">
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-danger">
                        {formik.errors.price}
                      </div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className="label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="Enter Description"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-danger">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label className="label">Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    placeholder="Enter Image url"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.image && formik.errors.image ? (
                      <div className="text-danger">{formik.errors.image}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="image">
                  <Form.Label className="label">Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileUpload}
                    //  value={formik.values.image}
                    placeholder="Enter Image url"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.image && formik.errors.image ? (
                      <div className="text-danger">{formik.errors.image}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group> */}

                <Button type="submit" className="post-btn">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
