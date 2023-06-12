import React from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../reducers/itemSlice';
import {ToastContainer,toast} from 'react-toastify';

import axios from 'axios';

const Index = (props) => {

    const navigate=useNavigate();
    const dispatch=useDispatch()

    const [open, setOpen] = React.useState(false);

    const token=localStorage.getItem('token');

    const onRemoveFromCart = (cartItemId) => {
        console.log("item removed from cart")
        
        axios
          .delete("http://localhost:3008/cart/" + cartItemId, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
            dispatch(getCartItems());
            // window.location.reload();
            setOpen(false)
          })
          .catch((err) => console.log(err));
    
        console.log("Item removed from cart, we just update the quantity");
        // window.location.reload();
        navigate("/parent/cartpage");
        setOpen(false)
      };
    

      const moveToWishList=()=>{
        console.log("Item moved to wish list")
        // navigate("/parent/wishlist");
        toast.success("Item moved to wishlist successfully", {autoClose:3000, hideProgressBar:true, position:"top-center"})
        setOpen(false)
      }



  return (
  <>
        <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
      <span className="material-icons-outlined">close</span>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            This is the modal title
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
            optional <code>aria-describedby</code> attribute.
          </Typography>
          <button className='transparent-btn'  onClick={() => {
                  onRemoveFromCart(props.itemId);
                }}>Remove</button>
        <button className='transparent-btn' onClick={moveToWishList}>Move to wishlist</button>
        </Sheet>
       
      </Modal>
    </React.Fragment>
    <ToastContainer/>
  </>
  )
}

export default Index;