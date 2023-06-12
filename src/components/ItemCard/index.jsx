import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Padding } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
//rating code imports

import Rating from "@mui/material/Rating";

import "./index.css";

const Index = (props) => {
  const { eachItem } = props;

  const [isWishListed, setIsWishListed] = useState(false);
  const navigate = useNavigate();
  // console.log(props)
  // console.log(eachItem)

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  // console.log(decoded);

  const onFavBtnClick = (id) => {
    setIsWishListed(!isWishListed);
    console.log(`${id} is added to wishlist`);
  };

  const goToDetailsPage = () => {
    navigate("/parent/carddetails/" + eachItem._id);
  };

  // const onItemCardClick=(item)=>{

  // }

  const itemData = eachItem;


  const deleteProduct = ()=>{
    console.log(eachItem._id)
    console.log("item will be deleted")
      axios.delete("http://localhost:3008/items/"+eachItem._id, {
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
        console.log(res)
        window.location.reload()
      })
      .catch((err)=>console.log(err))
  }


  const editProduct = ()=>{
    navigate("/parent/admin/"+eachItem._id)
  }

  return (
    <>
      {/* <Card style={{ width: '18rem' ,margin:"10px"}}>
       <Card.Img variant="top" src={eachItem.image} />
       <Card.Body>
         <Card.Title>{eachItem.title}</Card.Title>
         <Card.Text>
         {eachItem.description}
         </Card.Text>
         <Card.Text className="price">
         <span className="material-icons-outlined currency">
 currency_rupee
 </span>{eachItem.price}
        </Card.Text>
       </Card.Body>
    </Card>  */}
      <div
        style={{ padding: "5px", marginBottom: "20px" }}
        className="item-card"
      >
        <img src={eachItem.image} className="image" />

        <Rating
          name="half-rating-read"
          defaultValue={props.rating}
          precision={0.5}
          readOnly
        />
        <div>
          <h4>{eachItem.title}</h4>
          <p>{eachItem.description}</p>

          <div className="price-container">
            <p>
              <span className="material-icons-outlined currency">
                currency_rupee
              </span>
            </p>
            <p className="price">{eachItem.price}</p>
          </div>

          <div className="d-flex justify-content-around item-card-btn-container">
            <button
              className="fav-btn"
              onClick={() => onFavBtnClick(eachItem._id)}
            >
              {isWishListed ? (
                <span class="material-icons-outlined">favorite</span>
              ) : (
                <span className="material-icons-outlined">favorite_border</span>
              )}
            </button>
            {/* <Link  to='/parent/carddetails' state={itemData}>Go To Details</Link> */}
            <button onClick={goToDetailsPage} className="view-more-btn">
              View More
            </button>
            <button className='transparent-btn' onClick={deleteProduct}>
              <span className="material-icons-outlined">delete</span>
            </button>
            <button className='transparent-btn' onClick={editProduct}>
              <span className="material-icons-outlined">edit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
