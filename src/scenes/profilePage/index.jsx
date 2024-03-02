import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/utils/FriendListWidget";
import MyPostWidget from "scenes/widgets/utils/MyPostWidget";
import PostsWidget from "scenes/widgets/utils/PostsWidget";
import UserWidget from "scenes/widgets/user/UserWidget";
import AdvertWidget from "scenes/widgets/ads/AdvertWidget";
import PostComponent from "components/post/PostComponent";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PageSchemaComponent from "components/page/PageSchemaComponent";
import PageLoadingComponent from "components/page/PageLoadingComponent";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const url = process.env.REACT_APP_HOST_USERS;
  const myProfile = useSelector((state) => state.user.id) === userId;
  const getUser = async () => {
    setLoading(true);
    const response = await fetch(url+`/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return <PageLoadingComponent />;

  const top = () => {
    return <UserWidget userId={userId} />
  }

  const main = () => {
    return <>{myProfile && <><MyPostWidget picturePath={user.picturePath} />{isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />} </>}
    
    <PostsWidget userId={userId} isProfile /></>
  }

  const lastContent = () => {
    return <>
    <PostComponent titulo={"Medalhas"} subtitulo={"Medalhas Conquistadas"} content={"⛏️ Em construção..."} icon={<WorkspacePremiumIcon fontSize="large" />} />
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
    <AdvertWidget />
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
    <FriendListWidget userId={userId} /> </>
  }


  return <PageSchemaComponent topContent={top()} main={main()} lastContent={lastContent()}/>;
};

export default ProfilePage;
