import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Member ({ friendId, name, subtitle, titles, userPicturePath, owner, clan, email}) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isOwner = useSelector((state) => state.user.email) === owner;
  const myProfile = useSelector((state) => state.user.id) === friendId;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = true;
  
  const urlEnv = process.env.REACT_APP_HOST_GROUPS;
  const nav = useNavigate();
  const patchFriend = async () => {
    const response = await fetch(
      urlEnv+`/groups/${clan}/members/remove?email=${email}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(response.ok){
        nav(0);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {titles && <Typography color={medium} fontSize="0.75rem">
            {titles}
          </Typography>}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isOwner && !myProfile &&
      <> {  <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>

      }
      
      </>
      }

    </FlexBetween>
  );
};

export default Member;
