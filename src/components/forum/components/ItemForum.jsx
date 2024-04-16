import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FlexBetween from 'components/FlexBetween';
import {
    ChatBubbleOutlineOutlined,
  } from "@mui/icons-material";
import { useState } from 'react';
import UserImage from 'components/UserImage';

const ItemForum = ({topic}) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const [newComment, setNewComment] = useState("");
    const [isComments, setIsComments] = useState(false);
    
    const comments = [{
        "userId": "65739e40e8c0935ec34d97a2",
        "firstName": "Felipe",
        "lastName": "Brevio",
        "comment": "teste no front",
        "urlPicturePath": "https://res.cloudinary.com/dosghtja7/image/upload/v1695005286/assets/zup4gnxe93ra0aetsfoh.jpg",
        "createdAt": {
          "$date": "2024-01-22T23:18:29.244Z"
        }
      }];

      const getFormatedDate = (str) => {
        try {
         let currentDate = format(new Date(str), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
         return currentDate;
        } catch ( err ){
           console.log(err);
           return '';
         }
       }
       const handleComment = async () => {
        setNewComment('');
      }

    return <ListItem key={topic.id}>
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <ListItemText
        primary={topic.title}
        secondary={topic.content}
      />
      <FlexBetween gap="0.3rem">
        <Box />
        <Box display={"flex"}>
        <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
        </IconButton>
        {comments && <Typography marginTop={"0.4rem"} >{comments.length}</Typography>}
        </Box>
    </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
            {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
                <Divider />          
                <Box sx={{ m: "0.5rem 0", flexDirection: "column", display: "flex" }}>
                    <FlexBetween gap={"0.5rem"}>
                    <UserImage image={comment.urlPicturePath} size="24px"/>
                    <Typography sx={{ color: main, width: "100%" }}>
                        {comment.firstName} {comment.lastName}
                        <Typography color={medium} fontSize="0.75rem">
                            { getFormatedDate(comment.createdAt) }
                        </Typography>
                    </Typography>
                    </FlexBetween>
                    <Typography sx={{pl: "2rem", color: main, width: "100%" }}>
                        {comment.comment}
                    </Typography>
                </Box>
            </Box>
            ))}
            <Divider />
            <FlexBetween gap={"0.5rem"}>
            <InputBase
            placeholder="Deixe seu comentário..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            sx={{ borderRadius: "3rem", color: main, backgroundColor: palette.neutral.light, m: "0.5rem 0", pl: "1rem", width: "100%", }}
            />
            <Button
            disabled={!newComment}
            onClick={handleComment}
            sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
            }}
            >
            Comentar
            </Button>
            </FlexBetween>
        </Box>
        )}
        <Divider />
        </Box>
    </ListItem>
}

export default ItemForum;