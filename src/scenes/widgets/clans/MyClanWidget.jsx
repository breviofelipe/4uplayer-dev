import { useSelector } from "react-redux";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import PostComponent from "components/post/PostComponent";
import { useEffect, useState } from "react";
import GamerLoading from "components/gamerLoading/GamerLoading";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FlexBetween from "components/FlexBetween";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Member from "components/Member";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import ShareButton from "components/modals/LinkModal";
const MyClanWidget = ({ clan }) => {

  const url = process.env.REACT_APP_HOST_GROUPS;
  const urlClan = "https://4uplayer-dev.vercel.app/?clan="+clan;
  const token = useSelector((state) => state.token);
  const {clanOwner} = useSelector((state) => state.user);
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState();
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setLoading] =  useState(false);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const medium = palette.neutral.medium;
  
    
  console.log(clanOwner)
  const getAmount = async () => {
  
    try{
      const response = await fetch(
        url+`/groups/${clan}/amount`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){      
      const data = await response.json();
      setAmount(data);
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
    
  }
  const getUsers = async () => {
    setLoading(true);
    
    try{
      const response = await fetch(
        url+`/groups/${clan}?page=${page}&sizePerPage=5`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.ok){      
      const data = await response.json();
      setOwner(data.owner);
      setMembers(data.members.friends)
      setHasMore(data.members.hasMore)
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
    getAmount();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const content = () => {
    const listUsers =() => {

        function checkOwner (email) {
            if(owner === email){
                return true;
            } 
            else false;
        }

          return <Box display="flex" flexDirection="column" gap="1.5rem">
              {members.map((friend) => (
                <Member
                  key={friend.id}
                  friendId={friend.id}
                  clan={clan}
                  email={friend.email}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={checkOwner(friend.email) && "Lider"}
                  userPicturePath={friend.picturePath}
                  owner={owner}
                  titles={friend.role === 'PLAYER' && <>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.4rem",
                  }}>
                     <Typography color={palette.neutral.medium}>COFUNDADOR</Typography>
                     <BookmarkIcon sx={{ color: "gold" }} />
                  </Box>
                  </>}
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
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const wallet = () => {
    return <Box display="flex" alignItems="center" gap="1rem">
    <AccountBalanceWalletIcon />
    <Typography color={medium}>PLC</Typography>
    <Typography color={medium}>{formatNumberWithCommas(parseFloat(amount))}</Typography>
  </Box> 
  }

  const convidarClan = () => {
    return <>{clanOwner && <ShareButton url={urlClan} texto={"Compartilhe o link para convidar novos player para o Clan"} />}</>
  }

  return <PostComponent msg1={convidarClan()} titulo={"Clan"} subtitulo={clan} content={content()} isCenter={false} icon={<Diversity2Icon fontSize="large"/>} msg={wallet()} />
}

export default MyClanWidget;