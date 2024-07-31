
import PropTypes from 'prop-types';
import './ImagemArtistas.css'; // Importa o arquivo CSS para estilos adicionais
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import LoadingComponent from 'components/loading/Loading';
const ImagemArtistas = ( ) => {
  const { palette } = useTheme();
  const [userArt, setUserArt] = useState();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const randomImage = async () => {
    let url = process.env.REACT_APP_HOST_LOGIN;

    const response = await fetch(url+"/art", {
      method: "GET",
    });

    if(response.ok){
      let body = await response.json();
      console.log(body);
      setUserArt(body);
    }
  }

  useEffect(() => {
    randomImage()
  },[])
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"} bgcolor={"primary.dark"}>
      {!userArt ? <Box bgcolor={"primary.dark"} className="loading-container">
        <LoadingComponent />
      </Box> 
      :
      <><Box className="imagem-container">
      <div style={{
        height: isNonMobile ? undefined :  "80vh",
        backgroundImage:`url(${userArt.src})`,
      }} alt={'Imagem'} className="imagem-responsiva" />
    </Box>
    <FlexBetween>
      <Box display={"flex"} >
          <Typography color={palette.primary.light} >Artista da semana </Typography>
          <Typography ml={"0.5rem"}>{userArt.description}</Typography>
      </Box>
        <InfoOutlinedIcon color='disabled' />
    </FlexBetween></>
      }
    </Box>
  );
};

export default ImagemArtistas;
