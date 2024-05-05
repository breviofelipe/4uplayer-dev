import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import FlexBetween from 'components/FlexBetween';

const ShareButton = ({ url, texto }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => console.log('Link copiado com sucesso!'))
      .catch((error) => console.error('Erro ao copiar link:', error));
  };

  return (
    <>
      <IconButton
        variant="contained"
        onClick={handleOpen}
      >
        <ShareIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {texto}
          </Typography>
          <FlexBetween>
            <Typography id="modal-description" gutterBottom>
                {url}
            </Typography>
            <IconButton onClick={copyToClipboard} color="primary" aria-label="copy">
                <FileCopyIcon />
            </IconButton>
          </FlexBetween>
        </Box>
      </Modal>
    </>
  );
};

export default ShareButton;
