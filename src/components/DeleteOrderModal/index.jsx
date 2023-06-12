import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from 'axios';
import environment from '../../environment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {eachItem} = props;

  const onConfirm = ()=>{
    setOpen(false)
    let updatedEachItem = { ...eachItem, isCancelled:true }
   console.log(updatedEachItem)

    axios
    .put(`${environment.api}/orders/${eachItem._id}`, {updatedProduct:updatedEachItem}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  }

  const onCancel = ()=>{
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Cancel item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Do you want to delete this order?
          </Typography>

          <div>

            <button className='transparent-btn' onClick={onConfirm}>Confirm</button>
            <button className='transparent-btn' onClick={onCancel}>Cancel</button>

          </div>
         
        </Box>
      </Modal>
    </div>
  );
}