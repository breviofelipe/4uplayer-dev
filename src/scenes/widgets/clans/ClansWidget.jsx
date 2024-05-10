import { useSelector } from "react-redux";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import { useEffect, useState } from "react";
import GamerLoading from "components/gamerLoading/GamerLoading";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FlexBetween from "components/FlexBetween";
import Diversity2Icon from '@mui/icons-material/Diversity2';

const ClansWidget = ({ clan }) => {

  const url = process.env.REACT_APP_HOST_GROUPS;
  const token = useSelector((state) => state.token);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setLoading] =  useState(false);

  const getUsers = async () => {
    setLoading(true);
    
    try{
      const response = await fetch(
        url+`/groups?page=${page}&sizePerPage=2`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){      
      const data = await response.json();
      setMembers(data.content);
      setHasMore(!data.last)
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
              {members.map((group) => {
                return <Box id={group.name} display={"flex"} flexDirection={"column"} >
                          <Typography>{group.name}</Typography>
                          <Typography mb={"0.5rem"}>{group.members.length} Membros</Typography>
                          <Divider />
                </Box>
              })}
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
          </Box>        
      }
    
    return <>{isLoading ? <GamerLoading /> : <Box display="flex" flexDirection="column" gap="1rem">
    
    { listUsers() }
    
    </Box>}
    </>
  }

  return <PostComponent titulo={"Clans"} content={content()} isCenter={false} icon={<Diversity2Icon fontSize="large"/>} />
}

export default ClansWidget;