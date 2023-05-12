import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./index.css";
import { Padding } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Index = (props) => {
  const { eachItem } = props;
  const[isWishListed,setIsWishListed]=useState(false);
  // console.log(props)
  // console.log(eachItem)

  const onFavBtnClick=(id)=>{
    setIsWishListed(!isWishListed)
      console.log(`${id} is added to wishlist`)
  }

  // const onItemCardClick=(item)=>{

  // }

  const itemData=eachItem

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
      <Card className="card">
        <img src={eachItem.image} className="image card-img" />

        <div className="rating-container card-img-overlay d-flex">
          <div className="span-container">
            <span className="material-icons-outlined rating-icon ">star</span>
            <span>{eachItem.rating}</span>
          </div>
        </div>

        <div style={{ padding: "10px" }}>
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
          <button className="fav-btn" onClick={()=>onFavBtnClick(eachItem._id)}>
           {isWishListed?<span class="material-icons-outlined">
favorite
</span>:<span className="material-icons-outlined">favorite_border</span>}
            
          </button>
          <Link  to='/parent/carddetails' state={itemData}>Go To Details</Link>
        </div>
       
      </Card>
    </>
  );
};

export default Index;
