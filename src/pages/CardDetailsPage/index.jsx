import React from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import { useParams } from "react-router-dom";
import { getCartItems } from "../../reducers/itemSlice";
import HomePageNavComp from '../../components/HomepageNavComp'
import {ToastContainer,toast} from 'react-toastify';
import PirmaryNav from '../../components/PrimaryNav'
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from "@mui/material";







import "./index.css";

import "../../style.css";
import axios from "axios";


// toast.configure({
//   autoClose: 4000,
//   draggable: false,
//   closeButton: false,
//   draggablePercent: 100,
//   progressClassName: 'ourbar',
//   position: 'top-left',
//   style: {top: '90px'}
// });



const Index = () => {
  
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useContext(CartContext);
  const [addToCart, setAddToCart] = useState(false);
  
 
  const [addToCartMsg, setAddToCartMsg] = useState();
  const [itemDetails, setItemDetails] = useState({});
  const token = localStorage.getItem("token");
  const location = useLocation();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const state = location.state;
  // console.log(state);

const orderedItemsList = useSelector((state)=>state)
console.log(orderedItemsList);

  const cartItemsList = useSelector((state) => state.items.cartItems);
  // console.log(cartItemsList)
  // console.log(cartItemsList[0]?.productsArr);
  const cartItemsArr = cartItemsList[0]?.productsArr;
  // console.log(cartItemsArr);




  let filteredData=cartItemsArr&&[...cartItemsArr].filter((each)=>{
    // console.log(each._id)
    // console.log(itemDetails?._id);
    return each?._id===itemDetails?._id
  })

  // console.log(filteredData)
  // console.log(filteredData?.length, "filtereddata length")

 

  useEffect(() => {
    axios
      .get("http://localhost:3008/items/" + id)
      .then((res) => {
        setItemDetails(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);





  // console.log(itemDetails)
  // console.log(itemDetails&&itemDetails.image)
  const imgList = [
    { img: itemDetails?.image, id: 1 },
    { img: itemDetails?.image, id: 2 },
    { img: itemDetails?.image, id: 3 },
    { img: itemDetails?.image, id: 4 },
  ];
  // console.log(itemDetails);



  const onAddCartClick = async (item) => {
    item.quantity = 1;
    setAddToCart(true);
    cartItems.push(item);
    setCartItems(cartItems);
    // console.log(item);
    
  if(filteredData?.length!==0){
    // console.log(filteredData&&filteredData[0])
    const existingQuantity=filteredData&&filteredData[0].quantity
    //  console.log(existingQuantity)
     
     if(existingQuantity==5){
      // Calling toast method by passing string

    toast('Item has reached its maximum quantity in the cart',  {autoClose:3000, hideProgressBar:true,  position:"top-center"})
      console.log("Reached Maximum quantity")
     }else{
      item.quantity =parseInt(existingQuantity)+1;

     
    // item.quantity = 1;
    // console.log(cartItems)
    const userMail = localStorage.getItem("userMail");
    // const body = { userId: userMail, productId: item._id };
    const body = { productDetails: item };
    // console.log(item);

   


    }
     
     
   
  }
 
  const body = { productDetails: item };
  axios
  .post("http://localhost:3008/cart", body, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then((res) => {
    // console.log(res.data);
    setAddToCartMsg(res.data?.message);
    dispatch(getCartItems());
  })
  .catch((err) => console.log(err));





  };

  const goToCart = () => {
    // console.log("Directed to cart Page");

    navigate("/parent/cartpage");
  };

 
  const updateSearchTerm=(val)=>{
      navigate('/parent/home', {state:val});
  }



  return (
    <>

    <HomePageNavComp updateSearchTerm={updateSearchTerm}/>
   
      <Container>
        <Row>
          <Col sm="12" md="6">
            <Card>
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide "
                data-bs-ride="carousel"
                style={{ height: "70vh" }}
              >
                <div className="carousel-inner ">
                  <div className="carousel-item active carousel-card">
                    <img
                      src={itemDetails?.image}
                      className="d-block w-100 img-fluid"
                      alt="..."
                      style={{ height: "70vh" }}
                    />
                  </div>
                  <div className="carousel-item carousel-card">
                    <img
                      src={itemDetails?.image}
                      className="d-block w-100 img-fluid"
                      alt="..."
                      style={{ height: "70vh" }}
                    />
                  </div>
                  <div className="carousel-item carousel-card">
                    <img
                      src={itemDetails?.image}
                      className="d-block w-100 img-fluid"
                      alt="..."
                      style={{ height: "70vh" }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </Card>
          </Col>

          <Col>
            <Card className="details-card" style={{ padding: "10px" }}>
              <div>
                <h3>{itemDetails?.title}</h3>
                <p>{itemDetails?.description}</p>
                <h4>Rs.{itemDetails?.price}</h4>
               <Rating name="half-rating-read" defaultValue={itemDetails.rating} precision={0.5} readOnly /> 
               <br/>
                {addToCart ? (
                  <button className="button" onClick={() => goToCart(state)}>
                    Go To Cart
                  </button>
                ) : (
                  <button
                    className="button"
                    onClick={() => onAddCartClick(itemDetails)}
                  >
                    Add to Cart
                  </button>
                )}
                <button className="button">Add to WishList</button>
                <p>{addToCartMsg}</p>
               
                <ToastContainer />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
