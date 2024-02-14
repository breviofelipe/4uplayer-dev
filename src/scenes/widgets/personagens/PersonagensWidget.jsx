import { useState } from "react";
import PersonagemWidget from "./PersonagenWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const PersonagensWidget = ({ listaPersonagens }) => {

  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [ personagens, setPersonagens ] =  useState(listaPersonagens);

  const dividirLista = () => { 
    let novoArray = [];
    const corte = isNonMobileScreens ? 2 : 1;
    const lista = personagens.map(
      ({  id,
          nome,
          espetaculoId,
        }) => (<PersonagemWidget
          key={id}
          id={id}
          nome={nome}
          espetaculoId={espetaculoId}
        />)
    );

    for (var i = 0; i < lista.length; i = i + corte) {
      novoArray.push(lista.slice(i, i + corte));
    }
    
    novoArray = novoArray.map((element) => (<FlexBetween gap="0.5rem">{element}</FlexBetween>));
    // console.log(novoArray);
    return novoArray;
  }

  return (
    <><WidgetWrapper isMobile={!isNonMobileScreens}>
    <Typography
      color={palette.neutral.dark}
      variant="h4"
      fontWeight="500"
      sx={{ mb: "1.5rem" }}
    >
    Personagens
    </Typography>
      <Box display="flex" flexDirection="column" gap="1rem" > 
        { personagens && dividirLista() }
      </Box>
    </WidgetWrapper>
    </>
  );
};

export default PersonagensWidget;
