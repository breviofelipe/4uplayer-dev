import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import PageLoadingComponent from "components/page/PageLoadingComponent";
import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostComponent from "components/post/PostComponent";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function NotificationPage () {
    const { id } = useParams();
    const url = process.env.REACT_APP_HOST_NOTIFICATIONS;

    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user.id);
    const [notification, setNotification] = useState();
    const [isLoading, setLoading] = useState(false);
    const { palette } = useTheme();

    const feactNotifications = async () => {
        setLoading(true);
        setNotification(null);
        try{
          const response = await fetch(
            url+`/notifications/${userId}/${id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if(response.ok){
          const data = await response.json();
          console.log(data);
          setNotification(data);
        } else {
          console.log(response);
        }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
       }

    const getFormatedDate = (str) => {
        try {
         let currentDate = format(new Date(str), 'dd MMMM yyyy, HH:mm',  { locale: ptBR });
         return currentDate;
        } catch ( err ){
           console.log(err);
           return '';
         }
    }
    const topContent = () => {
        
    }
    const mainContent = () => {
      const content = () => {
        return <Box>
          <Typography>{notification.description}</Typography>
          <Typography>{notification.what}</Typography>
        </Box>
      }
     return <>{notification && <PostComponent titulo={notification.who} subtitulo={getFormatedDate( notification.when )} icon={<UserImage image={notification.image} size="24px"/>} content={ content() } />}</>
   
    }
    const lastContent = () => {
        
    }
    useEffect(() => {
      feactNotifications();
    }, [id]);

    return <>{isLoading ? <PageLoadingComponent /> : <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} />}</>
}