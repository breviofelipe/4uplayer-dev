import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import GamerLoading from "components/gamerLoading/GamerLoading";

const FriendListWidget = ({ userId }) => {
  const url = process.env.REACT_APP_HOST_USERS;

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getFriends = async () => {
    setLoading(true);
    const response = await fetch(
        url+`/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setLoading(false);
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
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
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box></>}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
