import { useState } from "react";
import { Box, Typography, Dialog, DialogContent, TextField, useTheme, Alert } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import PostButton from "components/PostButton";
import LoadingComponent from "components/loading/Loading";
import GamerLoading from "components/gamerLoading/GamerLoading";


const ModalFortnite = ({userId, token, url }) => {
    const [visibleModalGamerEdit, setVisibleModalGamerEdit] = useState(false);
    const [nikenameFortnite, setNicknameFortnite] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] =  useState();
    const { palette } = useTheme();
    const main = palette.neutral.main;
    return <><EditOutlined onClick={() => { 

        setVisibleModalGamerEdit(true);

      }} sx={{ color: main }} />

      <Dialog open={visibleModalGamerEdit} onClose={() => setVisibleModalGamerEdit(false)}>
      { success && <Alert onClose={() => {
          setSuccess(null);
        }}  severity="success">{success}</Alert> }
        <form>
          <DialogContent>
            <Box>
                {isLoading ? <GamerLoading /> :  <><Typography gutterBottom>
                  Fortnite Nickname
                </Typography>
              
                <TextField
                  fullWidth
                  label="nickname"
                  name="fortniteNickname"
                  value={nikenameFortnite}
                  onChange={(e) => setNicknameFortnite(e.target.value)}
                />
                <PostButton fullWidth text={'salvar'}  onClick={
                  async () => {
                    
                    setLoading(true);
                    const response = await fetch(url+`/users/stats/${userId}/fortnite?nickname=${nikenameFortnite}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    });
                    const data = await response.text();
                    if(data === 'OK'){
                        setSuccess("Atualizado com sucesso!");
                        setNicknameFortnite('');
                    }
                    setLoading(false);
                  }
                }/></>}
            </Box>
             
          </DialogContent>
        </form>

      </Dialog></>
}

export default ModalFortnite;