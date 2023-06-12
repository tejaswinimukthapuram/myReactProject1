import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";
import ModalComp from "../ModalComp";
import { useRef } from "react";
import environment from "../../environment";
import { Card } from "react-bootstrap";
import RatingComp from "../RatingComp";
import moment from "moment";
import img from "../../images/icons8-delivery-box-60.png";
import axios from "axios";
import DeleteOrderModal from '../DeleteOrderModal'

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const Index = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDelivered, setIsDelivered] = useState(false);

  const { eachItem } = props;
  console.log(eachItem)
  // const onCancelItem = () => {
  //   axios
  //     .delete(`${environment.api}/orders/${eachItem._id}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  //   var new_date = moment(eachItem.orderedOn, "DD-MM-YYYY").add('days', 5);
  //   console.log(new_date.format());

  console.log(moment(eachItem.orderedOn).format('dddd, MMMM Do YYYY'))

  const endDate = moment(eachItem.orderedOn).add(1, "days");
  console.log(endDate.format('dddd, MMMM Do YYYY'));

  const orderedOn = moment(eachItem.orderedOn).format("dddd, MMMM Do YYYY");

  const productWillbeDeliveredOn = moment(endDate, "YYYYMMDD").fromNow();

  // console.log(productWillbeDeliveredOn)

  const gotoCardDetailsPage = (each) => {
    navigate("/parent/carddetails/" + eachItem._id);
  };

  useEffect(() => {
    if (productWillbeDeliveredOn == "a few seconds ago") {
      setIsDelivered(true);
    }
  });
  return (
    <>
      <Card style={{ backgroundColor: "white", padding: "10px" }}>
        <div>
          <div className="delivery-status-container">
            <div className="delivery-box-icon-container">
              <img src={img} className="deliver-box-icon" />
              {eachItem.isCancelled?(<span className="material-icons delivery-tick-icon" >
cancel
</span>):isDelivered ? (
                <span className="material-icons delivery-tick-icon">
                  check_circle
                </span>
              ) : (
                ""
              )}
            </div>

            <h6 className="delivery-status">
            
             
              {eachItem.isCancelled?"Cancelled":isDelivered?"Delivered":"In transit"}
            </h6>
          </div>
          <p>
            {eachItem.isCancelled?"":isDelivered
              ? `Delivered ${endDate.format("dddd, MMMM Do YYYY")}`
              : `Will be delivered ${productWillbeDeliveredOn}`}
          </p>
        </div>

        <div className="d-flex " style={{ backgroundColor: "#f5f5f5" }}>
          <div className="image-container m-3">
            <button
              className="cart-page-img-btn"
              onClick={() => gotoCardDetailsPage(eachItem)}
            >
              <img src={eachItem.image} alt="" className="img" />
            </button>
          </div>
          <div className="details-container m-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between">
              <div>
                <h6>{eachItem.title}</h6>
                <p>{eachItem.description}</p>

                <p style={{ fontWeight: "700" }}>
                  {eachItem.productDetails?.price}
                </p>
                <p> Ordered On:{orderedOn}</p>
                
                {/* <div className="d-flex">
                  <button
                    className="cancel-item-btn"
                    onClick={onCancelItem}
                  >
                    Cancel item
                  </button>
              
                </div> */}

               {eachItem.isCancelled?"Refund will be credited in 5 business days":isDelivered!=true? < DeleteOrderModal eachItem={eachItem}/>:<button></button>}

                {isDelivered ?
                <div>
                <div className='d-flex'><button>Return</button> <button>Exchange</button></div>
                <RatingComp eachItem={eachItem}/> 
                </div>: ""}

              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Index;
