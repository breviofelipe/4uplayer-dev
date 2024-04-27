import { Box, Typography } from "@mui/material";
import GamerLoading from "components/gamerLoading/GamerLoading";
import PostComponent from "components/post/PostComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EstatisticasWidget = () => {
    const url = process.env.REACT_APP_HOST_MEMBERS;
    const [estatisticas, setEstatisticas] = useState();
    const [isLoading, setLoading] =  useState(false);
    const token = useSelector((state) => state.token);
    const fetchEstatistica = async () => {
            setLoading(true);
            try{
              const response = await fetch(
                url+`/members/estatisticas`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if(response.ok){      
              const data = await response.json();
              setEstatisticas(data);
            } else {
              console.log(response);
            }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
    }

    useEffect(() => {
        fetchEstatistica();
    }, [])
        const content = () => {
            return <>{isLoading ? <GamerLoading /> : <Box display={"flex"} flexDirection={"column"} mb="2rem">
            {estatisticas && <Typography variant="h5">Usuários: {estatisticas.countUser}</Typography>   } 
            {estatisticas && <Typography variant="h5">Posts: {estatisticas.countPost}</Typography>}
            {estatisticas && <Typography variant="h5">Comentários: {estatisticas.countComment}</Typography>}
            {estatisticas && <Typography variant="h5">Vendas: {estatisticas.countPayment}</Typography>}
        </Box> }</>
        }

        return <PostComponent isCenter={false} titulo={"Estatísticas"} subtitulo={"Nosso números"} content={content()} />
}

export default EstatisticasWidget;