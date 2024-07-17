
import PropTypes from 'prop-types';
import './ImagemArtistas.css'; // Importa o arquivo CSS para estilos adicionais
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const ImagemArtistas = ({ src, alt }) => {
  const { palette } = useTheme();
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"} bgcolor={"#3700FF"}>
      <Box className="imagem-container">
        <img src={src} alt={alt} className="imagem-responsiva" />
      </Box>
      <FlexBetween>
          <Box display={"flex"} >
            <Typography color={palette.primary.dark} >Artista da semana </Typography>
            <Typography ml={"0.5rem"}>Zihan - @zihan</Typography>
          </Box>
          <InfoOutlinedIcon />
      </FlexBetween>
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
