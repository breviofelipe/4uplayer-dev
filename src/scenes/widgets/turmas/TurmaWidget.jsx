import { FaTheaterMasks } from 'react-icons/fa'
import { FcInfo } from 'react-icons/fc'
import FlexBetween from "components/FlexBetween";
import { format } from 'date-fns';  
import ptBR from 'date-fns/locale/pt-BR';
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
  
  
  const TurmaWidget = ({  
    turmaId
  }) => {

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const turmas = useSelector((state) => state.turmas);
  const navigate = useNavigate();
  const [espetaculoInfo, setEstaculo] = useState();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getEspetaculo = () => {
    const data = turmas.filter((turma) => turma.turmaId === turmaId);
    if(data !== undefined){
      setEstaculo(data[0]);
    }
  };

  useEffect(() => {
    getEspetaculo();
  },[])

  const getFormatedDate = (apresentacoes) => {
    const apresentacoesFormat = apresentacoes.map(str => {
      try {
        let currentDate = format(new Date(str), 'dd MMMM yyyy',  { locale: ptBR });
        return currentDate;
       } catch ( err ){
          console.log(err);
          return '';
        }
    })
    return apresentacoesFormat;
   };

    return (
      <WidgetWrapper m="0 0" isMobile={!isNonMobileScreens}>
        <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => { 
          navigate({
            pathname:`/spectacle/`, search: createSearchParams({ 'turmaId': turmaId }).toString()
          })
        }}
      >
        <FlexBetween gap="1rem">
        <FaTheaterMasks size={36} />   
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {/* {turmaId} */}
              {espetaculoInfo && espetaculoInfo.espetaculo.titulo}
            </Typography>
            {/* {espetaculoInfo && <Typography color={medium}>Espetáculo: {espetaculoInfo.espetaculo.titulo}</Typography>} */}
            {espetaculoInfo && <Typography color={medium}>Estreia: {getFormatedDate(espetaculoInfo.espetaculo.apresentacoes)[0]}</Typography>}
         </Box>
        </FlexBetween>
         
        <FcInfo size={24} />   
       </FlexBetween>

      <Divider />
      { espetaculoInfo && <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={espetaculoInfo.imagemEspetaculo}
        />}
      </WidgetWrapper>
    );
  };
  
  export default TurmaWidget;
  