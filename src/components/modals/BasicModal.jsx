
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Button onClick={handleOpen}>
      <Typography mt={"0.3rem"} marginRight={"0.5rem"} variant="h3">Seja sócio</Typography>
                    <img width={"25px"} height={"25px"} src={'https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png'} />
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Texto explicando todas as regras e beneficios....
          </Typography>
            <Button>ACEITO</Button>
        </Box>
      </Modal>
    </div>
  );
}