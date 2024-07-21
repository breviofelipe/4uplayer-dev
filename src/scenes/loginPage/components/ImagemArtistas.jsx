
import PropTypes from 'prop-types';
import './ImagemArtistas.css'; // Importa o arquivo CSS para estilos adicionais
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import LoadingComponent from 'components/loading/Loading';
const ImagemArtistas = ({ src, alt, profile }) => {
  const { palette } = useTheme();
  const [userArt, setUserArt] = useState();

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
    <Box display={"flex"} flexDirection={"column"} width={"100%"} bgcolor={"#3700FF"}>
      {!userArt ? <Box className="loading-container">
        <LoadingComponent />
      </Box> 
      :
      <><Box className="imagem-container">
      <div style={{
        backgroundImage:`url(${userArt.src})`,
      }} alt={alt} className="imagem-responsiva" />
    </Box>
    <FlexBetween>
      <Box display={"flex"} >
          <Typography color={palette.primary.dark} >Artista da semana </Typography>
          <Typography ml={"0.5rem"}>{userArt.description}</Typography>
      </Box>
        <InfoOutlinedIcon />
    </FlexBetween></>
      }
    </Box>
  );
};

ImagemArtistas.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

ImagemArtistas.defaultProps = {
  alt: 'Imagem'
};

export default ImagemArtistas;
