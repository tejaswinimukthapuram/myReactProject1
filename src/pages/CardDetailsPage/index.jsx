import React from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useContext,useState} from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import './index.css'
import axios from "axios";

const Index = () => {
      const[ cartItems,setCartItems]=useContext(CartContext)
      const [addToCart, setAddToCart] = useState(false);
  const location = useLocation();
  const navigate=useNavigate()
  const state = location.state;
  // console.log(state);
  const imgList = [
    { img: state.image, id: 1 },
    { img: state.image, id: 2 },
    { img: state.image, id: 3 },
    { img: state.image, id: 4 },
  ];

  const onAddCartClick= async (item)=>{
    setAddToCart(true)
    cartItems.push(item)
     setCartItems(cartItems)
// console.log(cartItems)
const userMail=localStorage.getItem("userMail")
const body={userId:userMail,productId:item._id}
try{
  const response=await axios.post("http://localhost:3008/cart",{userId:userMail,productDetails:item})
console.log(response.data)
}
catch(err){
  console.log()
}

  }



const goToCart=(item)=>{
    console.log("Directed to cart Page")
    navigate("/parent/cartpage", {state:item})

}

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" md="6">
            <Card className="images-card">
              <ImageList
                sx={{ width: "100%", height: '100%' }}
                cols={3}
                rowHeight={164}
              >
                {imgList.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card className="details-card" style={{padding:"10px"}}>
              <div>
                <h3>{state.title}</h3>
                <p>{state.description}</p>
                <h4>Rs.{state.price}</h4>
               {addToCart? <button className="button" onClick={()=>goToCart(state)}>Go To Cart</button>: <button className="button" onClick={()=>onAddCartClick(state)}>Add to Cart</button>}
                <button className='button'>Add to WishList</button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
