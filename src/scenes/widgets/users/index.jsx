import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import { setUsers } from "state";
import PostComponent from "components/post/PostComponent";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import GamerLoading from "components/gamerLoading/GamerLoading";
const UserListWidget = () => {

  const url = process.env.REACT_APP_HOST_USERS;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  
  const [isLoading, setLoading] =  useState(false);
  
  const getUsers = async () => {
    setLoading(true);
    try{
      const response = await fetch(
        url+`/users`,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          </Box>        
      }
    
    return <>{isLoading ? <GamerLoading /> : <Box display="flex" flexDirection="column" gap="1rem">
    
    { listUsers() }
    
    </Box>}
    </>
  }

  return <PostComponent titulo={"Novos usuários"} content={content()} isCenter={false} />
}

export default UserListWidget;