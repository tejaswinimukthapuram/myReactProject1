import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../reducers/itemSlice";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./index.css";

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
  const [cartItems, setCartItems] = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItemsList = useSelector((state) => state.items.cartItems);
  console.log(cartItemsList);

  //CODE FOR DIALOGUE BOX

  const [open, setOpen] = useState(false);
  const location = useLocation() 

  const navigate =  useNavigate() 
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [location.key]);

  // console.log(cartItems)

  const onRemoveFromCart=(cartItemId)=>{
    axios.delete('http://localhost:3008/cart/'+cartItemId)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

    console.log("Item removed from cart")
    // window.location.reload();
    navigate('/parent/cartpage')
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" md="6">
            <Card>
              <div className="d-flex flex-row justify-content-between p-3">
                <p className="mt-3">Deliver To:</p>

                {/* <div  style={{backgroundColor:'pink'}}> */}
                {/* <Typography variant="subtitle1" component="div">
        {/* Selected: {selectedValue}
      </Typography> */}
                <br />
                {/* <Button  className='address-btn' onClick={handleClickOpen}>
        Add Address */}
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
              {cartItemsList &&
                cartItemsList.map((each) => {
                  return (
                    <Card key={each._id}>
                      <div className="d-flex">
                        <div className="image-container m-3">
                          <img
                            src={each.productDetails.image}
                            alt=""
                            className="img"
                          />
                        </div>
                        <div
                          className="details-container m-3"
                          style={{ width: "100%" }}
                        >
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6>{each.productDetails.title}</h6>
                              <p>{each.productDetails.description}</p>
                              <p style={{ fontWeight: "700" }}>
                                {each.productDetails.price}
                              </p>
                            </div>
                            <div>
                              <button className="cancel-btn" onClick={()=>{onRemoveFromCart(each._id)}}><span className="material-icons-outlined">close</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </Col>
          <Col sm="12" md="6">
            <Card></Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
