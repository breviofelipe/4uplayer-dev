import {
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, useMediaQuery, Button } from "@mui/material";
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

const UserWidget = ({ userId }) => {
  const url = process.env.REACT_APP_HOST_USERS;
  const urlLogin = process.env.REACT_APP_HOST_LOGIN;

  const [user, setUser] = useState(null);
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
          const response = await fetch(url+`/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (data) => {
            setUser(await data.json());
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
 
  useEffect(() => {
    getUser();  
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
  } = user;

  return <WidgetWrapper mobile={!isNonMobileScreens} >
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
                      <FlexBetween gap="0.5rem">
                        <Typography color={medium}><Masks quantidade={3}/></Typography>
                      </FlexBetween>
                        <FlexBetween gap="0.5rem">
                          <Typography color={medium}>GENERAL</Typography>
                        </FlexBetween>
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
            <Box display="flex" alignItems="center" gap="1rem">
              <AccountBalanceWalletIcon />
              <Typography color={medium}>PLC</Typography>
              <Typography color={medium}>1000000</Typography>
            </Box>       
          </Box>
          <Divider />
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem">
                <Diversity2Icon />
                <Typography color={medium}>Clan</Typography>
                <Typography color={medium}>Genesis</Typography>
              </Box>
          </Box>
          <Divider />
          {/* 3 ROW */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem">
                <WorkspacePremiumIcon />
                <Typography color={medium}>Medalhas</Typography>
                <Typography color={medium}>Primórdios, General, PlayerCoinFan...</Typography>
              </Box>
          </Box>
          <Divider />
          {/* 4 ROW */}
          <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img style={{width : 25, height: 25}} src="https://res.cloudinary.com/dosghtja7/image/upload/v1696357234/instagram_dvirc4.png" alt="instagram" />
              {linkEditInsta ? inputLink('https://instagram.com/', linkInsta, setLinkInsta) : 
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
        </WidgetWrapper>
};
export default UserWidget;
