import WidgetWrapper from "components/WidgetWrapper";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
  } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import DriverEmbed from "components/google/DriverEmbed";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPostPersonagem } from "state";
import { useNavigate } from "react-router-dom";

const DocumentoWidget = ({id, loggedInUserId, embedId, picturePath, description, subtitle, likes = false }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primary = palette.primary.main;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
    const likeCount = Object.keys(likes ? likes : []).length;
    const url = process.env.REACT_APP_HOST_ARCANE;
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const deletePost = async () => {
        const response = await fetch(url+`/turmas/${id}/posts`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        navigate(0);
    };

    const patchLike = async () => {
      const response = await fetch(url+`/turmas/${id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPostPersonagem({ post: updatedPost }));
      dispatch(setPost({ post: updatedPost }));
    };
    const mobile = () => {
        return <WidgetWrapper isMobile={true}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween gap="1rem">
                <UserImage image={picturePath} size="48px" />
                <Box>
                    <Typography color={main} sx={{ ml: "0.5rem" }} >
                        {description}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem" sx={{ ml: "0.5rem" }} >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {role === 'ADMIN' && <DeleteIcon onClick={deletePost} /> }
        </FlexBetween>
        <DriverEmbed embedId={embedId} />

        
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => {patchLike()}}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>
            </FlexBetween>
            <IconButton>
                <StarIcon sx={{ color: primary }} />
            </IconButton>
      </FlexBetween>
    </WidgetWrapper>
    };

    const nonMobile = () => {
        return <WidgetWrapper mb={"2rem"}>
        <FlexBetween mb={"1rem"}>
            <FlexBetween>
                <UserImage image={picturePath} size="50px" />
                <Box>
                    <Typography color={main} sx={{ ml: "0.5rem" }}>
                        {description}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem" sx={{ ml: "0.5rem" }}>
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {role === 'ADMIN' && <DeleteIcon onClick={deletePost} /> }
        </FlexBetween>
        
            <Box>
                <DriverEmbed embedId={embedId} />
            </Box>
        
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => {patchLike()}}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>
            </FlexBetween>
            <IconButton>
                <StarIcon sx={{ color: primary }} />
            </IconButton>
      </FlexBetween>
    </WidgetWrapper>
    };

    return <> { isNonMobileScreens ? nonMobile() : mobile()}</>
}

export default DocumentoWidget;