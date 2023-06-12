import React from "react";

import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PirmaryNav from "../../components/PrimaryNav";
import ItemCard from "../../components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getItems } from "../../reducers/itemSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col, Card } from "react-bootstrap";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { searchContext } from "../../App";
import BannerComp from '../../components/BannerComp'
import HomeCarouselComp from '../../components/HomeCarouselComp'
import Sparkle from 'react-sparkle'
import Carousel from "react-bootstrap/Carousel";


import axios from "axios";
import store from "../../store";
import HomepageNavComp from "../../components/HomepageNavComp";

import jwtDecode from "jwt-decode";

import "./index.css";

const Index = () => {
  const [searchVal, setSearchVal] = useContext(searchContext);
  const token1 = localStorage.getItem("token");
  // const decodedToken = decode(token1)

  // console.log(token1)
  // console.log(decodedToken)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [termFrmAnthrPage, setTermFrmAnthrPage]=useState("")

  // setTermFrmAnthrPage(location.state);

  const items = useSelector((state) => state.items.items);
  const [data, setData] = useState();
  const [perPage, setPerPage] = useState([]);
  // console.log(data);
  const [result, setResult] = useState();
  const [term, setTerm] = useState("");

  const updateSearchTerm = (term) => {
    // setTerm(val);
    if (!term) {
      setResult(data);
      setPerPage(data.slice(0, 10));
    }

    let myFilteredData = data?.filter((each) => {
      return each.title.toLowerCase().includes(term?.toLowerCase());
    });

    setResult(myFilteredData);
    setPerPage(myFilteredData?.slice(0, 10));
  };

  console.log(term);

  useEffect(() => {
    setData(items);
    setResult(items);
    setPerPage(items.slice(0, 12));
  }, [items]);

  const [isSort, setIsSort] = useState(true);


const onSortByBrand=()=>{
  if (isSort) {
    const sortedItems = [...items].sort((a, b) => {
      if(a.title > b.title){
        return 1;
      }
      if(a.title < b.title){
        return -1;
      }
      return 0;
      
    });

    console.log(sortedItems)
    setData(sortedItems);
    setResult(sortedItems);
    setPerPage(sortedItems.slice(0, 10));
  } else {
    const sortedItems = [...items].sort((a, b) => {
      return a.title > b.title;
    });
    setData(sortedItems);
    setResult(sortedItems);
    setPerPage(sortedItems.slice(0, 12));
  }
  setIsSort(!isSort);
  console.log(data);
  setAnchorEl(null);
}



  const onSortClick = () => {
    if (isSort) {
      const sortedItems = [...items].sort((a, b) => {
        return a.price - b.price;
      });
      setData(sortedItems);
      setResult(sortedItems);
      setPerPage(sortedItems.slice(0, 10));
    } else {
      const sortedItems = [...items].sort((a, b) => {
        return b.price - a.price;
      });
      setData(sortedItems);
      setResult(sortedItems);
      setPerPage(sortedItems.slice(0, 12));
    }
    setIsSort(!isSort);
    console.log(data);
    setAnchorEl(null);
  };

  const token = localStorage.getItem("token");

  const [searchTerm, setSearchTerm] = useState("");

  const pageHandler = (event, pageNum) => {
    // console.log(`${pageNum} is clicked `)
    setPerPage(result && result.slice(pageNum * 12 - 12, pageNum * 12));
  };

  // const getFilteredData = () => {
  //   if (!term) {
  //     setResult(data);
  //     setPerPage(data.slice(0, 10));
  //   }

  //   let myFilteredData = data?.filter((each) => {
  //     return each.title.toLowerCase().includes(term?.toLowerCase());
  //   });

  //   setResult(myFilteredData);
  //   setPerPage(myFilteredData?.slice(0, 10));

  // };

  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   if (!e.target.value) {
  //     setResult(data);
  //   }
  //   let term = e.target.value.toLowerCase();
  //   let filteredData = data.filter((each) => {
  //     return each.title.toLowerCase().includes(term);
  //   });

  //   setResult(filteredData);
  //   setPerPage(filteredData.slice(0, 10));
  // };

  // console.log(result)
  //POP OVER  CODE
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;




  return (
    <>
      <HomepageNavComp updateSearchTerm={updateSearchTerm} />
      <div className="d-flex flex-column">
     < HomeCarouselComp/>
     <div className="marquee mb-3">
{/* <h3 className="glow">50%-60% off this festive season</h3> */}
<img src="http://www.glittertextonline.com/donez/z6486dd2e121c8.gif"/>
        </div>
     
     <BannerComp/>
     
     
     </div>
    

    

     {/* <Container fluid>
          <Row>
            <Col>
            <BannerComp/>
            </Col>
          </Row>
        </Container> */}



      <div className="search-sort-container mt-5 mb-5">
        {/* <PirmaryNav updateSearchTerm={updateSearchTerm} /> */}

        {/* <div style={{ width: "40%" }}>
          <InputGroup className="mb-3 ">
            <InputGroup.Text id="basic-addon1">
              <span className="material-icons-outlined ">search</span>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for Products brands and more"
              aria-label="Search"
              aria-describedby="basic-addon1"
              // onChange={(e) => {

              //   setSearchTerm(e.target.value);
              // }}
              onChange={handleChange}
            />
          </InputGroup>
        </div> */}

      

     
     <br/>

        {/* POPOVER CODE */}

        <div>
          <Button aria-describedby={id} variant="outline" onClick={handleClick}>
            Sort<span className="material-icons-outlined">sort</span>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <button
                className="sort-btn"
                onClick={() => {
                  onSortClick();
                }}
              >
                SortBy Price
              </button>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <button
                className="sort-btn"
                onClick={() => {
                  onSortByBrand();
                }}
              >
                SortBy brand name
              </button>
            </Typography>
          </Popover>
        </div>
      </div>

      <Container>
        <Row>
          {/* {data&&data.length>=1?
          
          perPage
            .filter((each) => {
              return each.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((each) => {
              // console.log(each.title)
              return (
                <Col sm="12" md="3" key={each._id}>
                  <div onClick={()=>onCardClick(each)}>
                  <ItemCard eachItem={each} />
                  </div>
                  
                </Col>
              );
            }):<p>Data Loading</p>} */}

          {data && data.length >= 1 ? (
            perPage &&
            perPage.map((each) => {
              return (
                <Col sm="12" md="3" key={each._id}>
                  <div>
                    <ItemCard eachItem={each} />
                  </div>
                </Col>
              );
            })
          ) : (
            <div className="text-center">
              <div className="spinner-border my-spinner"></div>
            </div>
          )}
        </Row>
        <div className="pagination-container">
          <Stack spacing={1}>
            <Pagination
              count={data && Math.ceil(data.length / 10)}
              variant="outlined"
              shape="rounded"
              onChange={pageHandler}
            />
          </Stack>
        </div>
      </Container>
    </>
  );
};

export default Index;
