import React from "react";
import HomePageNavComp from "../../components/HomepageNavComp";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrdersCardComp from '../../components/OrdersCardComp'
import { useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";
import { getOrderedItems } from "../../reducers/itemSlice";
import axios from "axios";
import moment from "moment";
import './index.css';


const Index = () => {

  const dispatch = useDispatch();
  const [orderedItems, setOrderedItems] = useState();

  const cartItemsList = useSelector((state) => state.items.cartItems);
  // console.log(cartItemsList[0]?.productsArr);

  const cartItemsArr = cartItemsList[0]?.productsArr;
  // console.log(cartItemsArr);


useEffect(()=>{
  dispatch(getOrderedItems);
}, [])



  useEffect(()=>{
    axios.get('http://localhost:3008/orders',{
      headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res)=>{
      // console.log(res.data)
      setOrderedItems(res.data[0].productsArr)
      dispatch(getCartItems);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  console.log(orderedItems)
  return (
    <>
      <HomePageNavComp />
      <Row>
        <Container>
          <Col>
          <div className="order-page-main-container">
            <Card className="orders-page-card">
             {
             orderedItems&&orderedItems.map((each)=>{
                return <div className='each-order-card' key ={each._id}>
                  <OrdersCardComp eachItem={each} />
                  </div>
              })
             }
            </Card>
            </div>
          </Col>
        </Container>
      </Row>
    </>
  );
};

export default Index;
