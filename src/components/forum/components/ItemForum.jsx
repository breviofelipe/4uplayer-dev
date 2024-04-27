import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FlexBetween from 'components/FlexBetween';
import {
    ChatBubbleOutlineOutlined,
  } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import UserImage from 'components/UserImage';
import { useSelector } from 'react-redux';

const ItemForum = ({topic}) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const [newComment, setNewComment] = useState("");
    const [isComments, setIsComments] = useState(false);
    const [comments, setComments] = useState([]);
    const token = useSelector((state) => state.token);
    const [isLoading, setLoading] =  useState(false);

    const url = process.env.REACT_APP_HOST_MEMBERS;
    
    const fetchComments = async () => {
      setLoading(true);
    
    try{
      const response = await fetch(
        url+`/members/topic/comment?id=${topic.id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if(response.ok){      
      const data = await response.json();
      setComments(data)
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
      setLoading(false);
    }

    useEffect(() => {
      fetchComments();
    },[])

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
        const newTopic = {
          comment: newComment,
          topicId: topic.id
        };
        let body = JSON.stringify(newTopic)
        const reponse = await fetch(
          url+`/members/topic/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: body
        }
      );
        const data = await reponse.json();
        setComments(data);
        setNewComment('');
      }

    return <ListItem key={topic._id}>
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <ListItemText
        primary={topic.titulo}
        secondary={topic.conteudo}
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