import React from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PirmaryNav from "../../components/PrimaryNav";
import ItemCard from "../../components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getItems } from "../../reducers/itemSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col } from "react-bootstrap";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import axios from "axios";
import store from "../../store";
import "./index.css";

const Index = () => {
  const dispatch = useDispatch();
  // console.log(store);
  // const data1 = store.getState()
  // console.log(data1);
  const items = useSelector((state) => state.items.items);
  const [data, setData] = useState();
  const[perPage,setPerPage]=useState([])
  console.log(data);
  const [result, setResult] = useState();
  const [term, setTerm] = useState("");

  const updateSearchTerm = (val) => {
    console.log(val);
    console.log("SearchTermUpdated");
    setTerm(val);
  };

  useEffect(() => {
    setData(items);
    // setPerPage(items.slice(0,10))
  }, [items]);

  const [isSort, setIsSort] = useState(true);
  const onSortClick = () => {
    if (isSort) {
      const sortedItems = [...items].sort((a, b) => {
        return a.price - b.price;
      });
      setData(sortedItems);
    } else {
      const sortedItems = [...items].sort((a, b) => {
        return b.price - a.price;
      });
      setData(sortedItems);
    }
    setIsSort(!isSort);
    console.log(data);
    setAnchorEl(null);
  };

  const token = localStorage.getItem("token");
console.log(data)
  // useEffect(()=>{

  //     axios.get("http://localhost:3008/items", {
  //         headers:{
  //             "authorization":`Bearer ${token}`
  //         }
  //     })
  //     .then((res)=> setResult(res.data))

  // }, [])

  console.log(result);

  // console.log(data);


  const onCardClick=(item)=>{
      console.log(`${item._id} is clicked`)
  }



  const [searchTerm, setSearchTerm] = useState("");


  //POP OVER  CODE
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
     <>
     


      <div>
        {/* <PirmaryNav updateSearchTerm={updateSearchTerm} /> */}
       {/* POPOVER CODE */}
     <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
      Sort<span className="material-icons-outlined">sort</span>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        <button
          className="sort-btn"
          onClick={() => {
            onSortClick()
          }}
        >
          SortBy Price
        </button>
        </Typography>
      </Popover>
    </div>


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
                 
                  setSearchTerm(e.target.value);
                }}
              />
            </InputGroup>
          </div>
      </div>


      <Container>
        <Row>
        {
          
          data&&data
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
            })}
        </Row>
        <div className="pagination-container">
        <Stack spacing={1}>
      
      <Pagination count={data&&data.length} variant="outlined" shape="rounded" />
    </Stack>
        </div>
        
      </Container>
    </>
  );
};

export default Index;
