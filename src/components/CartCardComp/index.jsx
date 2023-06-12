import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";
import ModalComp from "../ModalComp";
import { useRef } from "react";
import axios from "axios";

const Index = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const oneRef=useRef()
  const twoRef=useRef();
  const threeRef=useRef();

  

  const { eachItem } = props;

 

  const token = localStorage.getItem("token");
 

  const onQtyIncrease = (e) => {
    console.log("Quantity increased");

    console.log(e.target.value);

    const updatedEachItem = { ...eachItem, quantity: parseInt(e.target.value) };

    const body = { productDetails: updatedEachItem };
    axios
      .post("http://localhost:3008/cart", body, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getCartItems());
      })
      .catch((err) => console.log(err));
  };

  const onQtyReduce = () => {};

  //   const qtyChange=(v)=>{
  //         console.log("quantity Changed")
  //   }

  const gotoCardDetailsPage = (each) => {
    navigate("/parent/carddetails/" + eachItem._id);
  };

  return (
    <>
      <div className="d-flex">
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

              <label>Select Quantity</label>
              <select placeholder="Qty" onChange={onQtyIncrease}>
                <option value={1} selected={eachItem.quantity===1?true:false}>1</option>
                <option value={2} selected={eachItem.quantity===2?true:false}>2</option>
                <option value={3}  selected={eachItem.quantity===3?true:false}>3</option>
                <option value={4}  selected={eachItem.quantity===4?true:false}>4</option>
                <option value={5}  selected={eachItem.quantity===5?true:false}>5</option>
                
              </select>
             

              <p style={{ fontWeight: "700" }}>
                {eachItem.productDetails?.price}

              </p>
            </div>
            <div>
              <ModalComp key={eachItem._id} itemId={eachItem._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
