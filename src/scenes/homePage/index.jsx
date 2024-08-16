import { Alert, Box, Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/user/UserWidget";

import FriendListWidget from "scenes/widgets/utils/FriendListWidget";

import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostsWidget from "scenes/widgets/posts/PostsWidget";
import MyPostWidget from "scenes/widgets/posts/MyPostWidget";
import UserListWidget from "scenes/widgets/users";
import MetaMaskWidget from "scenes/widgets/metamask/MetaMaskWidget";
import { useNavigate } from "react-router-dom";
import ResgateWidget from "scenes/widgets/resgate/ResgateWidgets";
import MemberWidget from "scenes/widgets/member/MemberWidget";
import MissionsWidget from "scenes/widgets/missions/MissionsWidget";
import MyClanWidget from "scenes/widgets/clans/MyClanWidget";
import BuyPlayerCoin from "scenes/widgets/buyCoin/BuyPlayerCoin";
import ClansWidget from "scenes/widgets/clans/ClansWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath, emailCheck, clan, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const theme = useTheme();

  const home = () => {
    const top = () => {
      return <Box>
        {!isNonMobileScreens && role !== "PLAYER" && <><MemberWidget />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}</>}
        <UserWidget userId={id} />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}

        {isNonMobileScreens && role !== "PLAYER" && <><MemberWidget />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}</>}
        <BuyPlayerCoin />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
        <ResgateWidget />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
        <Box mt={"0.4rem"}>
          {coinTicker()}
        </Box>
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}      
        <MetaMaskWidget />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      </Box>
    };

    const main = () => {
      return <>
       <MyPostWidget picturePath={picturePath} />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}     
      <PostsWidget />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
       </>
      
    }
    const coinTicker = () => {
      const url  = `https://coinbrain.com/coins/bnb-0x8c888e9187de82c5aaccd9e9acde6b3d15f4f906/ticker?theme=custom&background=${theme.palette.background.alt.replace('#', '')}&padding=16&type=small&currency=BRL`;
      return <iframe width="100%" height="104" frameBorder="0" scrolling="no" src={url}></iframe>
  }

    const lastContent = () => {
      return <>
          {emailCheck && <><MissionsWidget />{isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}</>}                    
          <MyClanWidget clan={clan} />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          <ClansWidget />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          
          <FriendListWidget userId={id} />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          <UserListWidget />
          {/* <PostBuild titulo={"Clans Populares"} subTitulo={"Encontre o seu"} /> */}
      </>
    }
    const alertCheckEmail = () => {
      if (!emailCheck){
        return <Alert sx={{marginTop: isNonMobileScreens ? '1rem' : undefined}} severity="info" action={
          <Button color="inherit" size="medium" onClick={() => {
            navigate(`/profile/email`)
          }}>
            Confirmar
          </Button>           
        }>
          <Typography variant="h5">Corfirme seu e-mail e ganhe 1000 PLC, com resgate imediato.</Typography>
        </Alert>
      } else {
        return false;
      }
    }
    return <PageSchemaComponent topContent={top()} main={main()} lastContent={lastContent()} alerUser={alertCheckEmail()}/>
  }

  return (home());
};

export default HomePage;
