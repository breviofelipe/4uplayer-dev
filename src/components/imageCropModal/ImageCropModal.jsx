import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Função para cortar a imagem
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
const ImageCropModal = ({ isOpen, onClose, imageSrc, onCropComplete, setBase64Image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (event, zoom) => {
    setZoom(zoom);
  };
  const onRotationChange = (event, rotation) => {
    setRotation(rotation);
  };

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
    handleImageCrop(croppedImage);
    onCropComplete(croppedImage); // Envia a imagem recortada para o componente pai
    onClose(); // Fecha o modal
  };


  const handleImageCrop = async (croppedBlob) => {
    try {
      // Converte o Blob em base64

      const convertBlobToBase64 = async () => {
        try {
          // Fetch the blob data
          const response = await fetch(croppedBlob);
          if (!response.ok) {
            throw new Error('Failed to fetch the image');
          }
          const blob = await response.blob();
  
          // Read the blob as a data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              setBase64Image(reader.result);
            } else {
              throw new Error('Failed to convert blob to base64');
            }
          };
          reader.onerror = () => {
            throw new Error('Error reading the blob');
          };
          reader.readAsDataURL(blob);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      };
      
      await convertBlobToBase64();      
    } catch (error) {
      console.error('Erro ao converter Blob para base64:', error);
    }
  };

  return (
    <Dialog
        fullScreen
        open={isOpen} onClose={onClose} >
      <DialogTitle>Ajuste a imagem</DialogTitle>
      <DialogContent dividers>
        
        <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1} // Aspecto 1:1 para uma imagem quadrada
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
            />
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <ZoomOutOutlinedIcon />
                    <Slider min={1} max={3} step={0.1} aria-label="Zoom" value={zoom} onChange={onZoomChange} />
                    <ZoomInOutlinedIcon />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <Rotate90DegreesCcwOutlinedIcon />
                    <Slider min={0} max={180} step={90} value={rotation} onChange={onRotationChange} aria-label="Rotação" />
                    <Rotate90DegreesCwOutlinedIcon />
                </Stack>
            </Box>
            
        <DialogActions>
            <Button sx={{
                backgroundColor: 'primary.main',
                color: 'neutral.dark',
            }} onClick={handleSave}>Salvar</Button>
            <Button sx={{
                backgroundColor: 'primary.main',
                color: 'neutral.dark',
            }}
             onClick={onClose}>Cancelar</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropModal;
