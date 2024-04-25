import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, Typography } from "@mui/material";
import { setUsers } from "state";
import PostComponent from "components/post/PostComponent";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import GamerLoading from "components/gamerLoading/GamerLoading";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FlexBetween from "components/FlexBetween";
import Icon4uPlayer from "components/icons/Icon4uPlayer";
const UserListWidget = () => {

  const url = process.env.REACT_APP_HOST_USERS;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] =  useState(false);
  
  const getUsers = async () => {
    setLoading(true);
    try{
      const response = await fetch(
        url+`/users?page=${page}&sizePerPage=5`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){
      
      const data = await response.json();
      dispatch(setUsers({ users: data }));
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const content = () => {
    const listUsers =() => {
          return <Box display="flex" flexDirection="column" gap="1.5rem">
              {users.map((friend) => (
                <Friend
                  key={friend.id}
                  friendId={friend.id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              ))}
              <Box>
                <FlexBetween gap={"1rem"}>
                <IconButton disabled={page == 0} onClick={() => {
                    setPage(page - 1);
                  }}>
                    <SkipPreviousIcon fontSize="large" />
                  </IconButton>
                  { page > 0 && <Typography>{page}</Typography>}
                  <IconButton onClick={() => {
                    setPage(page+1);
                  }}>
                    <SkipNextIcon fontSize="large" />
                  </IconButton>
                </FlexBetween>
              </Box>
          </Box>        
      }
    
    return <>{isLoading ? <GamerLoading /> : <Box display="flex" flexDirection="column" gap="1rem">
    
    { listUsers() }
    
    </Box>}
    </>
  }

  return <PostComponent titulo={"Novos usuários"} subtitulo={"Player que acabaram de chegar"} content={content()} isCenter={false} icon={<Icon4uPlayer />} />
}

export default UserListWidget;