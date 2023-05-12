import React from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import './index.css'

const Index = () => {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const imgList = [
    { img: state.image, id: 1 },
    { img: state.image, id: 2 },
    { img: state.image, id: 3 },
    { img: state.image, id: 4 },
  ];
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
                <button className="button">Add to Cart</button>
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
