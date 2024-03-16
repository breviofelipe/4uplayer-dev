import { Alert, Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/user/UserWidget";

import FriendListWidget from "scenes/widgets/utils/FriendListWidget";

import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostsWidget from "scenes/widgets/utils/PostsWidget";
import MyPostWidget from "scenes/widgets/utils/MyPostWidget";
import UserListWidget from "scenes/widgets/users";
import MetaMaskWidget from "scenes/widgets/metamask/MetaMaskWidget";
import { useNavigate } from "react-router-dom";
import PostBuild from "components/postConstruction/PostConstruction";
import ResgateWidget from "scenes/widgets/resgate/ResgateWidgets";
import MemberWidget from "scenes/widgets/member/MemberWidget";
import MissionsWidget from "scenes/widgets/missions/MissionsWidget";
import MyClanWidget from "scenes/widgets/clans/MyClanWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath, emailCheck, clan } = useSelector((state) => state.user);
  const navigate = useNavigate();
    
  const home = () => {
    const top = () => {
      return <>
        <UserWidget userId={id} />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
        <ResgateWidget />
        {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      </>
    };

    const main = () => {
      return <>
       <MyPostWidget picturePath={picturePath} />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      {/* <MemberWidget /> */}
      <MissionsWidget />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
      <PostsWidget />
      {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
       </>
      
    }

    const lastContent = () => {
      return <>
          <MyClanWidget clan={clan} />
          {isNonMobileScreens ? <><Box m="2rem 0" /></> : <><Divider /></>}
          <MetaMaskWidget />
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
          <Typography variant="h5">Corfirme seu e-mail e ganhe 1 PLC.</Typography>
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
