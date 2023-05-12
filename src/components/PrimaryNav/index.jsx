import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import "./index.css";
import { useEffect, useState } from "react";

function BrandExample(props) {
  const { updateSearchTerm } = props;
 
  const navigate = useNavigate();
  function onLogout() {
    // cookie.Expires = DateTime.Now.AddDays(-1);
    // Response.Cookies.Clear();
    localStorage.removeItem("token");
    navigate("/login");
  }

   const [searchTerm, setSearchTerm] = useState("");
 

  const items = useSelector((state) => state.items.items)
  const [data,setData]=useState()
  //  console.log(items)
   
  
// console.log(data)





  return (
    <>
      <Navbar className="nav" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
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

            <span className="material-icons-outlined fav-icon">
              shopping_cart
            </span>
            <span className="material-icons-outlined fav-icon">person</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
         
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;
