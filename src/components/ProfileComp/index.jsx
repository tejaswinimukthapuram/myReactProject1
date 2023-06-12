import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';





export default function BasicPopover() {

const navigate = useNavigate();
const userDetails = JSON.parse(localStorage.getItem("userdetails"));

function onLogout() {
  // cookie.Expires = DateTime.Now.AddDays(-1);
  // Response.Cookies.Clear();
  localStorage.removeItem("token");
  localStorage.removeItem("userMail");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("userdetails");
  navigate("/login");
}


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
    <div>
      <button aria-describedby={id}  onClick={handleClick} className='transparent-btn mt-2' >
      <span className="material-icons-outlined"  style={{color:"white", fontSize:"26px"}}>
person
</span>
      </button>
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

          <div>
            <h4>Hello {userDetails.username}</h4>
            <p>{userDetails.email}</p>
            </div>
         <hr/>
    <div className='d-flex flex-column'>

   
          <a href="orderspage">Orders</a>
          <a>Wishlist</a>
          <a>Coupons</a>
          <a>Contact us</a>

          <hr/>
          <a>Edit Profile</a>
          <button className="logout-btn" onClick={onLogout} style={{backgroundColor:"#ff4081"}}>Logout</button>
          </div>

          
        </Typography>
      </Popover>
    </div>
  );
}