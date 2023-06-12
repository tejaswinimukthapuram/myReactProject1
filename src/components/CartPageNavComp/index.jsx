import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import jwtDecode from "jwt-decode";
import StepperComp from "../StepperComp";
import ProfileComp from "../ProfileComp";

//RESPONSIVE NAVBAR IMPORTS

import Nav from "react-bootstrap/Nav";

import NavDropdown from "react-bootstrap/NavDropdown";

function Index(props) {
  //   const { updateSearchTerm } = props;
  const cartItemsList = useSelector((state) => state.items.cartItems);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  // console.log(decoded);
  function onLogout() {
    // cookie.Expires = DateTime.Now.AddDays(-1);
    // Response.Cookies.Clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userMail");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("userdetails");
    navigate("/login");
  }

  //   const [searchTerm, setSearchTerm] = useState("");

  //   const items = useSelector((state) => state.items.items);
  //   const [data, setData] = useState();

  const onCartClick = () => {
    navigate("/parent/cartpage");
  };

  const gotoWishlistPage = () => {
    navigate("/parent/wishlist");
  };

  const goToAdminPage = () => {
    navigate("/parent/admin");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="nav">
        <Container>
          <Navbar.Brand href="/parent/home" className="brand-name">
            <img
              alt=""
              src="https://i.pinimg.com/236x/b7/8e/16/b78e163a3a551906642dce556cc58d3e.jpg"
              width="50"
              height="50"
              className="d-inline-block "
              style={{ borderRadius: "50px", marginRight: "5px" }}
            />
            Shopify
          </Navbar.Brand>

          <StepperComp />

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <div className="d-flex flex-row">
                <button className="transparent-btn" onClick={gotoWishlistPage}>
                  <span className="material-icons-outlined fav-icon ">
                    favorite_border
                  </span>
                </button>

                {/* <button className='cart-btn' onClick={onCartClick}><span className="material-icons-outlined fav-icon">
              shopping_cart
            </span></button> */}
                {/* <Stack spacing={2} direction="row">
                  <button onClick={onCartClick} className="cart-btn">
                    <Badge
                      badgeContent={cartItemsList[0]?.productsArr.length}
                      color="info"
                    >
                      <span className="material-icons-outlined fav-icon">
                        shopping_cart
                      </span>
                    </Badge>
                  </button>
                </Stack> */}

                <ProfileComp />

                {decoded.username === "Admin" ? (
                  <button onClick={goToAdminPage} className="nav-item">
                    Admin
                  </button>
                ) : (
                  ""
                )}

                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* </Col></Row></Container> */}
    </>
  );
}

export default Index;
