import { EditOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import LoadingComponent from "components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setAtor } from "state";

const { Box, Typography, useTheme, Divider, Button, useMediaQuery } = require("@mui/material")
const { default: FlexBetween } = require("components/FlexBetween")
const { default: Masks } = require("components/masks/Masks");
const { useState } = require("react");
const FormMasks = ({ actorId, opnions }) => {
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const [grande, setGrande] = useState(false);
    const [quantidadeCriatividade, setQuantidadeCriatividade] = useState(5);
    const [quantidadePontualidade, setQuantidadePontualidade] = useState(5);
    const [quantidadeEquipe, setQuantidadeEquipe] = useState(5);
    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);
    const [enviando, setEnviando] = useState(false);
    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const url = process.env.REACT_APP_HOST_ARCANE;
    const postOpnion = async () =>{
      {      
        let body = {
          'userId' : userId,
          'actorId' : actorId,
          'trabalhoEquipe' : quantidadeEquipe,
          'pontualidade' : quantidadePontualidade,
          'criatividade' : quantidadeCriatividade
        };
        setEnviando(true)
        const response = await fetch(url+"/actors/opinion", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const res = await response.json();
        setEnviando(false)
        setGrande(false)
        dispatch(setAtor({ ator: res }));
      }
    }
  

    if(!actorId){
      return null;
    }
    if(opnions){
      const userOp = opnions.filter((op) => op === userId);
      if(userOp.length > 0){
        console.log("opnion posted")
        return null;
      }
    } else return null;
  
    // }
    return <div>
      {enviando ? <div><WidgetWrapper mobile={!isNonMobileScreens} ><LoadingComponent /></WidgetWrapper><Box m="2rem 0" /></div> : <div>{!isNonMobileScreens && <Divider />}<WidgetWrapper isMobile={!isNonMobileScreens}>
    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Deixe sua opnião!
    </Typography>
        <Divider />
    <Box p="1rem 0">
      <Box display="flex" justifyContent="space-between" >
      <Typography color={medium}>Criatividade </Typography>
        <FlexBetween>
            <Masks quantidade={quantidadeCriatividade} setNovaQuantidade={setQuantidadeCriatividade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Pontualidade</Typography>
        <FlexBetween>
            <Masks quantidade={quantidadePontualidade} setNovaQuantidade={setQuantidadePontualidade} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography color={medium}>Trabalho em equipe </Typography>
        <FlexBetween>
            <Masks quantidade={quantidadeEquipe} setNovaQuantidade={setQuantidadeEquipe} editavel={grande ? true : false} grande={grande}/>
        </FlexBetween>
      </Box>
    </Box>
    <Divider />
    <Box display="flex" justifyContent="space-between" >
    <FlexBetween />
    <FlexBetween gap="1rem" mb="0.5rem" mt="0.5rem">        
        {grande ? <Button
          onClick={() => postOpnion()}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Salvar
        </Button> : <EditOutlined onClick={() => setGrande(!grande)} sx={{ color: main }} />}
    </FlexBetween>
    </Box>
    </WidgetWrapper>
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
        </div>}
    </div>
}
export default FormMasks;