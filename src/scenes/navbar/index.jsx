import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import BasicMenu from "./components/BaseMenu";
import Icon4uPlayer from "components/icons/Icon4uPlayer";
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  let fullName = `Entrar`;

  if(user){
    fullName = `${user.firstName}`;
  }

  const [length, setLength] = useState(0);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.5rem">
      <Icon4uPlayer />
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home") }
          sx={{
            color: dark,
            marginTop: "0.5rem",
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
         4uPlayer
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Pesquisar..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
           {user && (user.role === 'PLAYER' || user.role === 'ADMIN') && <IconButton onClick={() => navigate("/cofunders")} >
                <Tooltip title="Exclusivo Cofundadores">
                  <BookmarkIcon sx={{ color: "gold", fontSize: "25px" }} />
                </Tooltip>
                </IconButton> 
            }
          {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton> */}
          <IconButton onClick={() => navigate("/games")} >
            <SportsEsportsIcon sx={{ fontSize: "25px" }} />
          </IconButton>          
         { user &&  <BasicMenu setLength={setLength} content={
            <Badge badgeContent={length} color="error">
              <Notifications  sx={{ fontSize: "25px" }} />
            </Badge>
            }/>}
          {user && <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
          }
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {user && (user.role === 'PLAYER' || user.role === 'ADMIN') && <IconButton onClick={() => navigate("/cofunders")} >
                <Tooltip title="Exclusivo Cofundadores">
                  <BookmarkIcon sx={{ color: "gold", fontSize: "25px" }} />
                </Tooltip>
                </IconButton> 
            }
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {/* {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )} */}
            </IconButton>
            <IconButton onClick={() => navigate("/games")} >
              <SportsEsportsIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            {user && <BasicMenu setLength={setLength} content={
            <Badge badgeContent={length} color="error">
              <Notifications  sx={{ fontSize: "25px" }} />
            </Badge>
            }/>}
            {user && <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
