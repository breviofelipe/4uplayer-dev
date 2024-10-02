import {
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, useMediaQuery, Button, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Masks from "components/masks/Masks";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { editSave, inputLink } from "./components/SocialProfiles";
import CancelIcon from '@mui/icons-material/Cancel';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import GamesIcon from '@mui/icons-material/Games';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from "react-router-dom";
import GamerLoading from "components/gamerLoading/GamerLoading";
import IconMedalGold from "components/icons/IconMedalGold";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LockClockIcon from '@mui/icons-material/LockClock';
import CountdownTimer from "components/countdownTimer/CountdownTimer";
import ModalClans from "components/modals/ModalClans";
import ModalFortnite from "./components/ModalFortnite";
import WalletModal from "./components/WalletModal";



const UserWidget = ({ userId }) => {

  const targetDate = new Date(2025, 3, 8);
  const url = process.env.REACT_APP_HOST_USERS;
  const urlLogin = process.env.REACT_APP_HOST_LOGIN;
  const urlMember = process.env.REACT_APP_HOST_MEMBERS;
  const [user, setUser] = useState(null);
  const [userWallet, setWalletUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [link, setLink] = useState();
  const [linkUpdate, setLinkUpdate] = useState();
  const [linkEditInsta, setEditInsta] = useState();
  const [linkInsta, setLinkInsta] = useState();

  const token = useSelector((state) => state.token);
  const myProfile = useSelector((state) => state.user.id) === userId; 
  const { palette } = useTheme();
  const navigate = useNavigate();
  
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
          setUser(null);
          fetch(url+`/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (data) => {
            const userResponse = await data.json();
            setUser(userResponse);
          }).catch(err => console.log);
  };

  const getWallet = async () => {
    setWalletUser(null);
    const response = await fetch(urlMember+`/members/wallet`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (data) => {
      setWalletUser(await data.json());
    });
  };

  const openNewTab = (social) => {
    if(social === 'TIKTOK'){
      window.open(user.linkTiktok, '_blank', 'noreferrer');
    }if(social === 'INSTAGRAM'){
      window.open(user.linkInstagram, '_blank', 'noreferrer');
    }  
  }

  const handlePatchPicture = async () => {
    if (image) {
        setUser(null);
        getBase64FromUrl(image);
    }
  };
  const [image, setImage] = useState(null);

  const getBase64FromUrl = (image) => {
    var reader = new FileReader();
     reader.readAsDataURL(image);
     reader.onload = async function () {
        const body = {
          file: reader.result,
          userId: userId
        };
        const response = await fetch(urlLogin+`/profile/picture`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setUser(await data);
        setImage(null);
        setEdit(false);
        // navigate(0);
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
      };
  }
  const drop = () => {
    return <Dropzone
    acceptedFiles=".jpg,.jpeg,.png"
    minSize={1024}
    maxSize={10072000}
    multiple={false}
    autoProcessQueue={false}
    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
  >
    {({ getRootProps, getInputProps }) => (
      <Box
        {...getRootProps()}
        border={`2px dashed ${palette.primary.main}`}
        p="1rem"
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <input {...getInputProps()} />
        {!image ? (  
          <CropOriginalIcon fontSize="large"/>
        ) : (
          <div>
            <FlexBetween>
            <Typography>{image.name.length > 10 ? image.name.substring(0, 10)+'...' : image.name}</Typography>
            <EditOutlinedIcon />
          </FlexBetween>
          </div>
        )}
      </Box>
    )}
    </Dropzone>
  };

  const editPic = () => {
    return <div>{!edit ? <ManageAccountsOutlined onClick={() => {
      setEdit(!edit)
    }} /> : <>
  <FlexBetween gap={"0.5rem"}>
  <Button
          onClick={() => {
            setEdit(false);
          }}>
      <CancelIcon fontSize="large" />
      </Button>
  <Button
    disabled={!image}
    onClick={handlePatchPicture}
    sx={{
      color: palette.background.alt,
      backgroundColor: palette.primary.main,
      borderRadius: "3rem",
    }}
  >
    Salvar
  </Button>
  
  </FlexBetween>
    </>}</div>
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
 
  const counterDown = () => {
    if(userWallet?.amountStack > 0){
      return <><Divider />
    <Box p="1rem 0">
    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Tempo restante para proximo saque
      </Typography>
      {userWallet && <CountdownTimer targetDate={userWallet.dateStackFinish} />}
    </Box></>
    } else {
      return <></>
    }
  }

  useEffect(() => {
    getUser();
    getWallet();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <GamerLoading />
  }  

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    clan, 
    role,
    wallet,
    nickName,
    clanOwner
  } = user;


  

  return <WidgetWrapper minWidth={"365px"} style={role === 'PLAYER' ? {
    border: '2px solid gold',
    boxShadow: '0px 0px 25px rgba(255, 215, 0, 0.5)', /* Define o efeito de sombra com cor dourada */
    // background: 'linear-gradient(145deg, #ffd700, #ffd700 50%, #e8c100 50%, #e8c100)', /* Cria o efeito de gradiente dourado */
  } : {} } mobile={!isNonMobileScreens} >
          {/* FIRST ROW */}
          <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
              >

               
                <FlexBetween gap="1rem">
                  {user && edit ?  drop() : <UserImage image={user.picturePath} />}
                  {!edit && <Box onClick={() => navigate(`/profile/${userId}`)} >
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
                      {firstName} {lastName}
                    </Typography>
                      {role === 'ADMIN' && <><FlexBetween gap="0.5rem">
                        <Typography color={medium}><Masks quantidade={5}/></Typography>
                      </FlexBetween>
                      <FlexBetween gap="0.5rem">
                        <Typography color={medium}>GENERAL</Typography>
                      </FlexBetween></>}
                      {nickName && <Typography color={medium}>@{nickName}</Typography>}
                      {role === 'PLAYER' && <>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.4rem",
                      }}>
                         <Typography color={medium}>COFUNDADOR</Typography>
                         <BookmarkIcon sx={{ color: "gold" }} />
                      </Box>
                      </>}
                  </Box>}
                </FlexBetween>
                { myProfile && editPic() }
              </FlexBetween>
          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <GamesIcon />
              <Typography color={medium}>LV.</Typography>
              <Typography color={medium}>100.000</Typography>
            </Box>
            <FlexBetween>
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <AccountBalanceWalletIcon />
                <Typography color={medium}>PLC</Typography>
                <Typography color={medium}>{formatNumberWithCommas(parseFloat(wallet))}</Typography>
              </Box>
              {myProfile && role === 'PLAYER' && userWallet?.amountStack == 0 && userWallet?.amount > 10_000 && <><WalletModal /></>}
              
            </FlexBetween>
            <Box display="flex" alignItems="center" gap="1rem">
            {myProfile && role === 'PLAYER' && userWallet?.amountStack > 0 && <>
                  <LockClockIcon />
                  <Typography color={medium}>PLC</Typography>
                  {userWallet && <Typography color={medium}>{formatNumberWithCommas(parseFloat(userWallet.amountStack))}</Typography>}
                </>
                }  
            </Box>     
          </Box>
          <Divider />
          {clan && <Box p="1rem 0">
            <Box >
                <FlexBetween>
                  <Box display={"flex"} alignItems="center" gap="1rem" width={"100%"}>
                    <Diversity2Icon />
                    <Typography color={medium}>Clan</Typography>
                    <Typography color={medium}>{clan}</Typography>
                  </Box>
                  {myProfile && <Box display="flex">
                      <ModalClans clanOwner={clanOwner} />                  
                  </Box>}
                </FlexBetween>
              </Box>
          </Box>}
          <Divider />
          {/* 3 ROW */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" >
                  <WorkspacePremiumIcon />
                  <FlexBetween width={"100%"}>
                    <Typography color={medium}>Medalhas</Typography>
                    <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                      <IconMedalGold />
                      <Typography color={medium}>Primórdios</Typography>
                    </Box>
                  </FlexBetween>
                  {/* <Typography color={medium}>Primórdios, PlayerCoinFan...</Typography> */}
             </Box>
          </Box>
          <Divider />
        {/* 5 ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Gamer Profiles
          </Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1727316730/assets/games/klyikxhewyuhliqvljld.jpg" alt="fortnite" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Fortnite
                </Typography>
                <Typography color={medium}>Online Game</Typography>         
              </Box>
            </FlexBetween>
            { myProfile && <>
              <ModalFortnite userId={userId} token={token} url={url} />
            </>
            }
          </FlexBetween>
        </Box>  
        {/* 5 ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1696357234/instagram_dvirc4.png" alt="instagram" />
              {linkEditInsta ? inputLink('https://instagram.com/', linkInsta, setLinkInsta, palette) : 
              <Box>
                <Typography onClick={() => {openNewTab('INSTAGRAM')}} color={main} fontWeight="500">
                  Instagram
                </Typography>
                <Typography color={medium}>Network Platform</Typography>         
              </Box>
            } 
            </FlexBetween>
            { myProfile && editSave(linkEditInsta, setEditInsta, "INSTAGRAM", userId, linkInsta, token, setUser, palette) }
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1696357233/tik-tok_g5e5lg.png" alt="tiktok" />
              {link ? inputLink('https://tiktok.com/@...', linkUpdate, setLinkUpdate, palette ) : 
                <Box>
                  <Typography onClick={() => {openNewTab('TIKTOK')}} color={main} fontWeight="500">
                    Tiktok
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              }
            </FlexBetween>
            { myProfile && editSave(link, setLink, "TIKTOK", userId, linkUpdate, token, setUser, palette) }
          </FlexBetween>
        </Box>
        
        {myProfile && role === 'PLAYER' && counterDown()}
        </WidgetWrapper>
};
export default UserWidget;
