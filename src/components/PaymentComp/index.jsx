import React from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";

const Index = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalPrice, cartItemsArr } = props;
  const date = moment().format();

  console.log(cartItemsArr);

  let updatedCartItems =
    cartItemsArr &&
    cartItemsArr.map((each) => {
      return { ...each, orderedOn: date, isOrdered: true, isCancelled:false };
    });

  console.log(updatedCartItems);

  const onPlaceOrder = () => {
    console.log("Order Placed");

    axios
      .post(
        "http://localhost:3008/orders",
        { productsArr: updatedCartItems },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
       
        navigate("/parent/orderspage");
      })
      .catch((err) => console.log(err));


      axios.delete('http://localhost:3008/cart',{
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
        console.log(res.data)
     

      })
      .catch((err)=>console.log(err))

     
  };

  return (
    <>
      <Card>
        <div className="p-3 payment-container">
          <h6>Coupons</h6>
          <div className="d-flex flex-row justify-content-between mt-2">
            <div className="d-flex flex-row mt-2">
              <span className="material-icons-outlined">local_offer</span>
              <p>Apply coupons</p>
            </div>
            <div>
              <button className="address-btn">Apply</button>
            </div>
          </div>

          <hr />

          <h6>Price Details</h6>
          <ul className="list">
            <li className="d-flex flex-row justify-content-between">
              <p>Total MRP</p>
              <p>{totalPrice}</p>
            </li>
            <li className="d-flex flex-row justify-content-between">
              <p>Discount on MRP</p>
              <p style={{ color: "#ff4081" }}>-{(totalPrice * 10) / 100}</p>
            </li>
            <li className="d-flex flex-row justify-content-between">
              <p>Convinience Fee</p>
              <p style={{ color: "#ff4081" }}>+{40}</p>
            </li>
            <hr></hr>

            <li className="d-flex flex-row justify-content-between">
              <h5>Total Amount</h5>
              <p style={{ fontWeight: "bold" }}>
                {totalPrice - (totalPrice * 10) / 100 + 40}
              </p>
            </li>
          </ul>

          <h6>Payment Details</h6>

          <ul className="list">
            <li className="d-flex flex-row justify-content-between mb-3">
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="phonepay"
                  id="phonepay"
                />
                <label htmlFor="phonepay">Phone Pay</label>
              </div>
              <img
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/phonepe-logo-icon.svg"
                className="payment-icon"
              />
            </li>

            <li className="d-flex flex-row justify-content-between mb-3">
              <div>
                <input type="radio" name="payment" value="paytm" id="paytm" />
                <label htmlFor="paytm">Paytm</label>
              </div>
              <img
                src="https://w7.pngwing.com/pngs/305/719/png-transparent-paytm-ecommerce-shopping-social-icons-circular-color-icon-thumbnail.png  "
                className="payment-icon"
              />
            </li>
            <li className="d-flex flex-row justify-content-between mb-3">
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="googlepay"
                  id="googlepay"
                />
                <label htmlFor="googlepay">Google Pay</label>
              </div>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png?f=webp"
                className="payment-icon"
              />
            </li>
            <li className="d-flex flex-row justify-content-between mb-3">
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="cashondelivery"
                  id="cashondelivery"
                />
                <label htmlFor="cashondelivery">Cash On Delivery</label>
              </div>
              <img
                src="https://img.freepik.com/premium-vector/cash-delivery_569841-162.jpg?w=2000"
                className="payment-icon"
              />
            </li>
          </ul>
        </div>
        <button className="place-order-btn" onClick={onPlaceOrder}>
          PLACE ORDER
        </button>
      </Card>
    </>
  );
};

export default Index;
