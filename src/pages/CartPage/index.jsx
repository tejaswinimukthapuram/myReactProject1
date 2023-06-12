import React, { useEffect } from "react";

import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CartContext } from "../../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";
import { useLocation } from "react-router-dom";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import PaymentComp from "../../components/PaymentComp";
import CartCardComp from "../../components/CartCardComp";
import axios from "axios";
//IMPORT FOR MUI DIALOGUE BOX
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import CartPageNavComp from "../../components/CartPageNavComp";
import "./index.css";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const onSaveAddress = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ color: "palevioletred", fontWeight: "700" }}>
        Enter Address
      </DialogTitle>
      <div className="d-flex flex-column p-3">
        <label htmlFor="city" style={{ color: "palevioletred" }}>
          City
        </label>
        <input type="text" id="city" placeholder="Enter city name" />
        <label htmlFor="landmark" style={{ color: "palevioletred" }}>
          Landmark
        </label>
        <input type="text" id="landmark" placeholder="Enter Landmark" />
        <button onClick={() => onSaveAddress()} className="address-btn">
          Save Address
        </button>
      </div>
    </Dialog>
  );
}

const Index = (props) => {
  const [dummyState, setDummyState] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [parentItemData, setParentItemData] = useState();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const dispatch = useDispatch();
  const cartItemsList = useSelector((state) => state.items.cartItems);
  // console.log(cartItemsList[0]?.productsArr);

  const cartItemsArr = cartItemsList[0]?.productsArr;

  // console.log(cartItemsArr);
  const token = localStorage.getItem("token");

  const priceArr =
    cartItemsArr &&
    cartItemsArr.map((each) => {
      const eachQuantity = each.quantity;
      console.log(each.quantity);
      console.log(each.price);
      return eachQuantity * each.price;
    });
  // console.log(priceArr);
  const totalPrice = priceArr?.reduce((acc, val) => {
    return acc + parseInt(val);
  }, 0);
  // console.log(totalPrice);
  //CODE FOR DIALOGUE BOX

  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const qtyChange = (v) => {
    console.log("quantity changed from child component");
    setQuantity(v);
  };
  // console.log(quantity);

  const gotoHomePage = () => {
    navigate("/parent/home");
  };

  const emptyCartOnOrderPlaced = () => {
    console.log("Cart items should be emptied");
    setIsOrderPlaced(true);
  };

  console.log(isOrderPlaced)

  return (
    <>
      <CartPageNavComp />
      {cartItemsArr&&cartItemsArr.length!=0? (
        <Container>
          <Row>
            <Col sm="12" md="6">
              <Card>
                <div className="d-flex flex-row justify-content-between p-3">
                  <p className="mt-3">Deliver To:</p>

                  <button className="address-btn" onClick={handleClickOpen}>
                    Add Address
                  </button>
                  {/* </Button> */}
                  <SimpleDialog
                    // selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
                  {/* </div> */}
                </div>
              </Card>
              <div>
                {cartItemsArr &&
                  cartItemsArr.map((each) => {
                    return (
                      <Card key={each._id}>
                        <CartCardComp eachItem={each} qtyChange={qtyChange} />
                      </Card>
                    );
                  })}
              </div>
            </Col>
            <Col sm="12" md="6">
              <PaymentComp
                totalPrice={totalPrice}
                cartItemsArr={cartItemsArr}
                emptyCartOnOrderPlaced={emptyCartOnOrderPlaced}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <div className="d-flex flex-column justify-content-center align-items-center empty-cart">
                <span className="material-icons-outlined ">shopping_cart</span>
                <h4>Your cart feels very light!!!</h4>
                <button className="button" onClick={gotoHomePage}>
                  Add items
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Index;
