import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/utils/FriendListWidget";
import MyPostWidget from "scenes/widgets/posts/MyPostWidget";
import PostsWidget from "scenes/widgets/posts/PostsWidget";
import UserWidget from "scenes/widgets/user/UserWidget";
import PostComponent from "components/post/PostComponent";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PageSchemaComponent from "components/page/PageSchemaComponent";
import PageLoadingComponent from "components/page/PageLoadingComponent";
import IconMedalGold from "components/icons/IconMedalGold";
import MyClanWidget from "scenes/widgets/clans/MyClanWidget";
import TransferComponent from "components/wallet/TransferComponent";
import StatsWidget from "scenes/widgets/fortnite/StatsWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const url = process.env.REACT_APP_HOST_USERS;
  const myProfile = useSelector((state) => state.user.id) === userId;
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  const playerData = {
    data: {
      stats: {
        all: {
          squad: {
            wins: 3,
            kills: 16,
            killsPerMatch: 0.5,
            killsPerMin: 0.085,
            top3: 3,
            scorePerMatch: 146.406,
            matches: 32,
            score: 4685,
            scorePerMin: 24.788,
            top6: 5,
            minutesPlayed: 189,
            playersOutlived: 1170,
            kd: 0.552,
            winRate: 9.375,
            lastModified: "2020-12-29T02:06:05Z",
            deaths: 29
          },
          overall: {
            wins: 3,
            top12: 0,
            kills: 23,
            killsPerMatch: 0.561,
            top10: 1,
            killsPerMin: 0.093,
            top3: 3,
            scorePerMatch: 146.634,
            matches: 41,
            top25: 3,
            score: 6012,
            scorePerMin: 24.34,
            top5: 0,
            top6: 5,
            minutesPlayed: 247,
            playersOutlived: 1587,
            kd: 0.605,
            winRate: 7.317,
            lastModified: "2024-06-15T18:23:00Z",
            deaths: 38
          },
          solo: {
            wins: 0,
            kills: 7,
            killsPerMatch: 0.778,
            top10: 1,
            killsPerMin: 0.121,
            scorePerMatch: 147.444,
            matches: 9,
            top25: 3,
            score: 1327,
            scorePerMin: 22.879,
            minutesPlayed: 58,
            playersOutlived: 417,
            kd: 0.778,
            winRate: 0,
            lastModified: "2024-06-15T18:23:00Z",
            deaths: 9
          }
        },
        keyboardMouse: {
          overall: {
            wins: 0,
            top12: 0,
            kills: 0,
            killsPerMatch: 0,
            top10: 0,
            killsPerMin: 0,
            top3: 0,
            scorePerMatch: 17,
            matches: 1,
            top25: 0,
            score: 17,
            scorePerMin: 17,
            top5: 0,
            top6: 0,
            minutesPlayed: 1,
            playersOutlived: 1,
            kd: 0,
            winRate: 0,
            lastModified: "2024-06-15T18:23:00Z",
            deaths: 1
          },
          solo: {
            wins: 0,
            kills: 0,
            killsPerMatch: 0,
            top10: 0,
            killsPerMin: 0,
            scorePerMatch: 17,
            matches: 1,
            top25: 0,
            score: 17,
            scorePerMin: 17,
            minutesPlayed: 1,
            playersOutlived: 1,
            kd: 0,
            winRate: 0,
            lastModified: "2024-06-15T18:23:00Z",
            deaths: 1
          }
        },
        gamepad: {
          squad: {
            wins: 3,
            kills: 16,
            killsPerMatch: 0.5,
            killsPerMin: 0.085,
            top3: 3,
            scorePerMatch: 146.406,
            matches: 32,
            score: 4685,
            scorePerMin: 24.788,
            top6: 5,
            minutesPlayed: 189,
            playersOutlived: 1170,
            kd: 0.552,
            winRate: 9.375,
            lastModified: "2020-12-29T02:06:05Z",
            deaths: 29
          },
          overall: {
            wins: 3,
            top12: 0,
            kills: 23,
            killsPerMatch: 0.575,
            top10: 1,
            killsPerMin: 0.093,
            top3: 3,
            scorePerMatch: 149.875,
            matches: 40,
            top25: 3,
            score: 5995,
            scorePerMin: 24.37,
            top5: 0,
            top6: 5,
            minutesPlayed: 246,
            playersOutlived: 1586,
            kd: 0.622,
            winRate: 7.5,
            lastModified: "2020-12-30T19:09:05Z",
            deaths: 37
          },
          solo: {
            wins: 0,
            kills: 7,
            killsPerMatch: 0.875,
            top10: 1,
            killsPerMin: 0.123,
            scorePerMatch: 163.75,
            matches: 8,
            top25: 3,
            score: 1310,
            scorePerMin: 22.982,
            minutesPlayed: 57,
            playersOutlived: 416,
            kd: 0.875,
            winRate: 0,
            lastModified: "2020-12-30T19:09:05Z",
            deaths: 8
          }
        }
      },
      account: {
        name: "Febrevio",
        id: "fb3db879264643f49e19cc8183a6b37a"
      },
      battlePass: {
        level: 1,
        progress: 0
      }
    },
    status: 200
  };


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
    return <>
    {!myProfile && <><TransferComponent token={token} toUserId={userId} isNonMobile={isNonMobileScreens} />{isNonMobileScreens ? <Box m="2rem 0" /> : <Divider /> }</>
    }
    <UserWidget userId={userId} />
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider /> }
    {/* <StatsWidget data={playerData.data} /> */}
    </>
  }

  const main = () => {
    return <>{myProfile && <><MyPostWidget picturePath={user.picturePath} />{isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />} </>}
    
    <PostsWidget userId={userId} isProfile /></>
  }

  const lastContent = () => {
    const content = () => {
      return  <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
                <IconMedalGold />
                <Typography color={medium}>Primórdios</Typography>
              </Box>
    }
    return <>
    {user && <><MyClanWidget clan={user.clan} />{isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}</>}
    <PostComponent titulo={"Medalhas"} subtitulo={"Medalhas Conquistadas"} content={content()} icon={<WorkspacePremiumIcon fontSize="large" />} />
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
    <FriendListWidget userId={userId} /> </>
  }


  return <PageSchemaComponent topContent={top()} main={main()} lastContent={lastContent()}/>;
};

export default ProfilePage;
