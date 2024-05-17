import React, { PropsWithChildren } from 'react';
import { Box, Button, Modal } from '@mui/material';
import MyModalStyle from './MyModal-style';

const MyModal: React.FC<PropsWithChildren> = ({children}) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...MyModalStyle, width: 200 }}>
            {children}
        </Box>
      </Modal>
    </>
  );
};

export default MyModal;
