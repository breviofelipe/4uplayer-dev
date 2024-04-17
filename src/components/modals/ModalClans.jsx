
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GamerLoading from "components/gamerLoading/GamerLoading";
import { setClan } from "state";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, IconButton, InputBase } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import InputComponent from "components/InputComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalClans({clanOwner}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const url = process.env.REACT_APP_HOST_GROUPS;
  const urlMembers = process.env.REACT_APP_HOST_MEMBERS;;
  const token = useSelector((state) => state.token);
  const walletId = useSelector((state) => state.user.wallet);
  const [ wallet, setWallet ] =  useState();
  const [isLoading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState();
  const [err, setErr] = useState();

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  const fetchNewGroup = async () => {
    setLoading(true);
    let body = { name: value, first: clanOwner};
    const newClanResponse = await fetch(
      url+"/groups",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      }

    ).catch(err => {
      console.log(err);
    });
    if(newClanResponse.ok){
        dispatch(setClan({ clan: value }));
        nav(0);
    } else {
        setErr("Este clan já existe.")
        setLoading(false);
    }
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const getWallet = async () => {
    setWallet(null);
    const response = await fetch(urlMembers+`/members/wallet`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (data) => {
      setWallet(await data.json());
    });
  };

  useEffect(() => {
    getWallet();
  }, [walletId])

  return <>{!isLoading ? <div style={{ marginTop: "0rem"}}>
  <IconButton onClick={handleOpen}>
     <CreateIcon />
  </IconButton>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Criar um novo clan
        </Typography>
        <Typography variant="h5">
            Deseja criar um novo Clan?
        </Typography>
        {!clanOwner && <><Typography>
            Todos os player podem criar um clan, mas isso só pode ser feito uma vez e o nome não poderar ser alterado. 
        </Typography>
        <Typography>
            Quando seu novo clan atingir pelo cinco membros você será premiado com 10.000 PLCs. Válido para os primeiros 100 clans. 
        </Typography></>}
        <Typography>
            Para criar novos clans será necessário 10 PLCs.
        </Typography>
        <Box display={"flex"} gap={"1rem"}>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChange} />}
          label="Ao clicar em criar você concorda."
        />
        </Box>
        {isChecked && <><InputComponent placeholder={"Nome do novo clan"} value={value} setValue={setValue} /></>}
        <Button disabled={!isChecked} onClick={() => fetchNewGroup()}>Criar</Button>
        {/* {wallet && wallet.amount < 64000 && <Typography color={"error"}>Saldo insuficiente. PLC {formatNumberWithCommas(wallet.amount)}</Typography>} */}
        {wallet && wallet.amount >= 64000 && <Typography mt={"0.5rem"} color={"sucess"}>PLC {formatNumberWithCommas(wallet.amount)}</Typography>}
        {err && <Typography color={"error"} >{err}</Typography>}
    </Box>
  </Modal>
</div>:
  <GamerLoading />
}</>
}