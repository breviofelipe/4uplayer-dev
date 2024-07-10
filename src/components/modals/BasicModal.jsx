
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import PDFViewer from "components/PDFViwer";
import { useDispatch, useSelector } from "react-redux";
import GamerLoading from "components/gamerLoading/GamerLoading";
import { setRole } from "state";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, useMediaQuery } from "@mui/material";
import Icon4uPlayer from "components/icons/Icon4uPlayer";



export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const url = process.env.REACT_APP_HOST_MEMBERS;
  const token = useSelector((state) => state.token);
  const walletId = useSelector((state) => state.user.wallet);
  const [ wallet, setWallet ] =  useState();
  const [isLoading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isNonMobileScreens ? "50%" : "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  const fetchNewConfunder = async () => {
    setLoading(true);
    const newCofunderResponse = await fetch(
      url+"/members/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      }

    ).catch(err => {
      console.log(err);
    });
    if(newCofunderResponse.ok){
      var data = await newCofunderResponse.json();
      dispatch(setRole({ role: data }));
    }
    nav(0);
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const getWallet = async () => {
    setWallet(null);
    const response = await fetch(url+`/members/wallet`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (data) => {
      setWallet(await data.json());
    });
  };

  useEffect(() => {
    getWallet();
  }, [walletId])


  return <>{!isLoading ? <div style={{ marginTop: "2rem"}}>
  <Button onClick={handleOpen}>
  <Typography mt={"0.3rem"} marginRight={"0.5rem"} variant="h3">Seja sócio</Typography>
  <Icon4uPlayer />
  </Button>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    
    <Box sx={style}>
      
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Termo de aceite
        </Typography>
        <PDFViewer />
        <Box display={"flex"} gap={"1rem"}>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChange} />}
          label="Ao clicar em aceito você concorda com o investimentos 64.000 PLC's com o tempo mínimo de permanência de 6 meses."
        />
        </Box>
        {wallet && <Button disabled={wallet.amount < 64000 || !isChecked} onClick={fetchNewConfunder}>ACEITO</Button>}
        {wallet && wallet.amount < 64000 && <Typography color={"error"}>Saldo insuficiente. PLC {formatNumberWithCommas(wallet.amount)}</Typography>}
        {wallet && wallet.amount >= 64000 && <Typography mt={"0.5rem"} color={"sucess"}>PLC {formatNumberWithCommas(wallet.amount)}</Typography>}
    </Box>
  </Modal>
</div>:
  <GamerLoading />
}</>
}