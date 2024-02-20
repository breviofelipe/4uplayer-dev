import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, IconButton, MenuList, Paper, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from 'state';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu({content, setLength}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user.id);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = (id, props) => {
    setAnchorEl(null);
    if(!!!props){
      navigate(`/notifications/${id}`);
    }
  };

  const getFormatedDate = (str) => {
    try {
     let currentDate = format(new Date(str), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
     return currentDate;
    } catch ( err ){
       console.log(err);
       return '';
     }
   }

   const feactNotifications = async () => {
    try{
      const response = await fetch(
        url+`/notifications/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){
      const data = await response.json();
      dispatch(setNotifications({ notifications: data }));
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
   }

   const massa = [{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "A very long text that overflows..."
        },{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "TESNTANDO..."
        },{
            name: "TESTE", image: "https://res.cloudinary.com/dosghtja7/image/upload/v1707940336/assets/w5vviukwefe2hwykn2jt.png", who: "4uPlayer", when: '', what: "TESNTANDO..."
        }];

  const menuItem = ( ) => {
    if(notifications.length > 0){
      const result = notifications.filter((item) => item.visualized===false).length;
      setLength(result);
    }
    return notifications.map(({name, image, who, when, what, id, visualized}, i) => (
        <>
          <Paper sx={{ width: 320, maxWidth: '100%', marginBottom: '0.4rem', marginLeft: '0.4rem', marginRight: '0.4rem' }}>
          <MenuList>
            <MenuItem sx={{backgroundColor: visualized ? palette.background.paper : palette.primary.light }} onClick={() => handleClose(id)} key={`${name}-${i}`}>
              <Divider />
              <Box sx={{ m: "0.5rem 0", display: 'flex', flexDirection: "column",}}>
                  <FlexBetween gap={"0.5rem"}>
                  <UserImage image={image} size="24px"/>
                  <Typography sx={{ color: main, width: "100%" }}>
                      { who }
                      <Typography color={medium} fontSize="0.75rem">
                          { getFormatedDate( when ) }
                      </Typography>
                  </Typography>
                  </FlexBetween>
                  <Box display={"flex"} width={"300px"}  >
                    <Typography variant="inherit" noWrap sx={{color: main }}>
                        { what }
                    </Typography>
                  </Box>
              </Box>
          </MenuItem>
          </MenuList>
          </Paper>
        
        </>
    ))

  }

  

  const ITEM_HEIGHT = 48;

  React.useEffect(() => {feactNotifications()}, [])
  
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