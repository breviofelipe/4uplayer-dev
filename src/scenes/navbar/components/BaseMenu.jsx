import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function BasicMenu({content}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFormatedDate = (str) => {
    try {
     let currentDate = format(new Date(), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
     return currentDate;
    } catch ( err ){
       console.log(err);
       return '';
     }
   }

   const massa = [{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "A very long text that overflows..."
        },{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "TESNTANDO..."
        },{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "TESNTANDO..."
        }];

  const menuItem = (name, i, image, who, when, what ) => {
    return massa.map(({name, image, who, when, what}, i) => (
        <>
        <MenuItem style={{ width: '200px', whitespace: 'normal' }} onClick={handleClose} key={`${name}-${i}`}>
            <Divider />
            <Box sx={{ m: "0.5rem 0", display: 'flex', flexWrap: 'wrap', flexDirection: "column", overflow: "hidden", textOverflow: "ellipsis"}}>
                <FlexBetween gap={"0.5rem"}>
                <UserImage image={image} size="24px"/>
                <Typography sx={{ color: main, width: "100%" }}>
                    { who }
                    <Typography color={medium} fontSize="0.75rem">
                        { getFormatedDate({ when }) }
                    </Typography>
                </Typography>
                </FlexBetween>
                <Typography variant="inherit" noWrap sx={{color: main, display: 'flex', flexWrap: 'wrap',  }}>
                    { what }
                </Typography>
            </Box>
        </MenuItem>
        </>
    ))

  }

  

  const ITEM_HEIGHT = 48;
  
  return (
    <div>
      <IconButton
        id="basic-button"
        onClick={handleClick}
      >
        {content}
      </IconButton>
      <Menu
        autoWidth={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
      >
        {menuItem()}
      </Menu>
    </div>
  );
}