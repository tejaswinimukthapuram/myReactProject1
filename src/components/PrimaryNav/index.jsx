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
import "./index.css";
import { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import jwtDecode from "jwt-decode";

//RESPONSIVE NAVBAR IMPORTS

import Nav from "react-bootstrap/Nav";

import NavDropdown from "react-bootstrap/NavDropdown";

function Index(props) {
  const { updateSearchTerm } = props;
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

  const [searchTerm, setSearchTerm] = useState("");

  const items = useSelector((state) => state.items.items);
  const [data, setData] = useState();
  //  console.log(items)

  // console.log(data)

  const onCartClick = () => {
    navigate("/parent/cartpage");
  };

  const gotoWishlistPage = () => {
    navigate("/parent/wishlist");
  };

  const onSelectGender = (e) => {
    // if(e.target.value==="women"){
    //   console.log("Selected Category is women")
    // }
    // else if(e.target.value==="men"){
    //   console.log("Selected Category is men")
    // }else{
    //   console.log("Selected Category is kids")
    // }
    console.log(e.target.value);
  };

 

  const goToAdminPage = () => {
    navigate("/parent/admin");
  };

  return (
    <>
      {/* <Container fluid><Row><Col sm='12'> */}
      {/* <Navbar className="nav" variant="dark">
        <Container>
          <Navbar.Brand href="/parent/home">
            <img
              alt=""
              src="https://i.pinimg.com/236x/b7/8e/16/b78e163a3a551906642dce556cc58d3e.jpg"
              width="50"
              height="50"
              className="d-inline-block "
              style={{borderRadius:"50px", marginRight:"5px"}}
            />
           Shopify
          </Navbar.Brand>

          <div className="input-group">
            <InputGroup className="mb-3 ">
              <InputGroup.Text id="basic-addon1">
                <span className="material-icons-outlined ">search</span>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search for Products brands and more"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  updateSearchTerm(e.target.value);
                  setSearchTerm(e.target.value);
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex flex-row">
            <span className="material-icons-outlined fav-icon ">
              favorite_border
            </span>

            <button className='cart-btn' onClick={onCartClick}><span className="material-icons-outlined fav-icon">
              shopping_cart
            </span></button>
            <span className="material-icons-outlined fav-icon">person</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
         
          </div>
        </Container>
      </Navbar> */}

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
          {/* <div className="input-group">
            <InputGroup className="mb-3 ">
              <InputGroup.Text id="basic-addon1">
                <span className="material-icons-outlined ">search</span>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search for Products brands and more"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  updateSearchTerm(e.target.value);
                  // setSearchTerm(e.target.value);
                }}
              />
            </InputGroup>
          </div> */}
          {/* SELECT INDICATOR MUI CODE */}

          <div>
            <Select
              placeholder="Select a category…"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 230,
                backgroundColor: "transparent",
                color: "white",
              }}
              onChange={onSelectGender}
            >
              <Option value="women">Women</Option>
              <Option value="men">Men</Option>
              <Option value="kids">Kids</Option>
            </Select>
            {/* <select  onChange={(e)=>onSelectGender(e)} placeholder="Select a category...">
      <option value="women">Women</option>
      <option value="men">Men</option>
      <option value="kids">Kids</option>
    </select> */}
          </div>
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
                <Stack spacing={2} direction="row">
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
                </Stack>

                <span className="material-icons-outlined fav-icon">person</span>

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
