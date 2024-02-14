import { useEffect, useState } from "react";
import AtorWidget from "./AtorWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
const AtoresWidget = ({ listaAtores }) => {
    
  const { palette } = useTheme();
  const [ atores, setAtores ] =  useState();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getAtores = () => {
     setAtores(listaAtores);
  };


  useEffect(() => {
    getAtores();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <><WidgetWrapper isMobile={!isNonMobileScreens}>
    <Typography
      color={palette.neutral.dark}
      variant="h5"
      fontWeight="500"
      sx={{ mb: "0.5rem" }}
    >
    <StarIcon fontSize="small" sx={{ color: palette.primary.main }} /> Elenco
    </Typography>
    <Divider />
    <Box mt={"0.5rem"} display="flex" flexDirection="column" gap="1.5rem"> 
    { atores && atores.map(
        ({
            id,
            turmaId,
            nome,
            sobrenome,
            personagens,
            userPicturePath,
            estrelas,
            pontualidade,
            trabalhoEquipe,
            criatividade
          }) => (
          <AtorWidget
            key={id}
            id={id}
            turmaId={turmaId}
            nome={nome}
            sobrenome={sobrenome}
            personagens={personagens}
            userPicturePath={userPicturePath}
            estrelas={estrelas}
            pontualidade={pontualidade}
            trabalhoEquipe={trabalhoEquipe}
            criatividade={criatividade}  
          />
        )
      )
      }
      </Box>
    </WidgetWrapper>
    </>
  );
};

export default AtoresWidget;
