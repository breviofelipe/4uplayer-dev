import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  IconButton,
  styled,
  Paper,
  Alert,
  Box,
} from '@mui/material';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import { Wallet, Numbers } from '@mui/icons-material';
import PostButton from 'components/PostButton';
import { useSelector } from 'react-redux';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import { useNavigate } from 'react-router-dom';

function WalletModal() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantityErro, setQuantityErro] = useState(false);
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(0);
  };

  const handleSubmit = async () => {

    if(quantity >= 1000){
    //TODO fetch
    setLoading(true);
    const response = await fetch(url+`/wallet/withdraw`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount : quantity, toAddress: address })
      });
      if(response.ok) { 
        setMessage('Solicitação enviado com sucesso');
        setSuccess(true);
        setAddress('');
        setQuantity('');
      }
      else {
          const status = response.status;
          const data = await response.text();
          setLoading(false);
          if(status == 405){
            setMessage(data);
            setAddressError(true);
          } else {
            setMessage(data);
            setQuantityErro(true);
          }
      }   
    setLoading(false);
  } else{
    setMessage("Minimo 1000 PLCs");
    setQuantityErro(true);
  }
  };

  return (
    <><IconButton onClick={handleOpen}>
        <IosShareRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
      {isLoading ? <GamerLoading /> : <>
        <Alert onClose={() => {
          setSuccess(false);
          handleClose();
        }} sx={{ display: success ? "flex" : "none"}} >
          {message}  
        </Alert>
        <DialogTitle>Saque PLC</DialogTitle>
        <DialogContent>
        <TextField
          margin="dense"
          id="address"
          name='address'
          label="Endereço da carteira BNB"
          type="text"
          fullWidth
          variant="outlined"
          error={addressError}
          helperText={address && message}
          onChange={(e) => setAddress(e.target.value)}
          InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <Wallet />
          </InputAdornment>
      ),
      }}
      />
      <TextField
        margin="dense"
        id="quantity"
        name='quantity'
        label="Quantidade"
        type="number"
        fullWidth
        variant="outlined"
        onChange={(e) => setQuantity(e.target.value)}
        error={quantityErro && quantity < 1000}
        helperText={quantityErro && message}
        InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Numbers />
          </InputAdornment>
        ),
        }}
      />
        </DialogContent>
        <DialogActions>
        <PostButton onClick={handleClose} text={'Cancelar'} />
        <PostButton disabled={address === ''} onClick={handleSubmit} text={'Confirmar'}/>
        </DialogActions>
        </>}
        </Dialog></>
  );
}

export default WalletModal;