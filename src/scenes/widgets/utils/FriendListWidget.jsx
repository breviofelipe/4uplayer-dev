import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";

import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendsPage } from "state";
import GamerLoading from "components/gamerLoading/GamerLoading";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FlexBetween from "components/FlexBetween";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const FriendListWidget = ({ userId }) => {
  const url = process.env.REACT_APP_HOST_USERS;

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.friends);
  const friendsId = useSelector((state) => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState();
  const getFriends = async () => {
    setLoading(true);
    const response = await fetch(
        url+`/users/${userId}/friends?page=${page}&sizePerPage=5&sortDirection=DESC`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){
      const data = await response.json();
      dispatch(setFriendsPage({ friends: data.friends }));
      setHasMore(data.hasMore);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [page, friendsId]); // eslint-disable-line react-hooks/exhaustive-deps
  
  if(!friends || friends.length == 0) return null;

  return (
    <WidgetWrapper mobile={!isNonMobileScreens}>
      {isLoading ? <GamerLoading /> : <><Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Amigos
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.role === 'PLAYER' && <>
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.4rem",
            }}>
               <Typography color={palette.neutral.medium}>COFUNDADOR</Typography>
               <BookmarkIcon sx={{ color: "gold" }} />
            </Box>
            </>}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
      <Box>
        <FlexBetween gap={"1rem"}>
        <IconButton disabled={page == 0} onClick={() => {
            setPage(page - 1);
          }}>
            <SkipPreviousIcon fontSize="large" />
          </IconButton>
          { page > 0 && <Typography>{page}</Typography>}
          <IconButton disabled={!hasMore} onClick={() => {
            setPage(page+1);
          }}>
            <SkipNextIcon fontSize="large" />
          </IconButton>
        </FlexBetween>
      </Box> 
      </>}
           
    </WidgetWrapper>
  );
};

export default FriendListWidget;
