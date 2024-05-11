import PageSchemaComponent from "components/page/PageSchemaComponent";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/user/UserWidget";
import PostComponent from "components/post/PostComponent";
import Forum from "components/forum";
import CofundersWidget from "scenes/widgets/cofunder/CofundersWidget";
import EstatisticasWidget from "scenes/widgets/estatisticas/EstatisticasWidget";
import { Box, useTheme } from "@mui/material";


const CofunderPage = () => {
    const { id } = useSelector((state) => state.user);
    const theme = useTheme();
    const content = () => {

        const coinCharter = () => {
            const url  = `https://coinbrain.com/embed/bnb-0x8c888e9187de82c5aaccd9e9acde6b3d15f4f906?theme=custom&padding=16&background=${theme.palette.background.alt.replace('#', '')}&chart=1&trades=1&simple=1`;
            return <iframe width="100%" height="504" frameBorder="0" scrolling="no" src={url}></iframe>
        }
    return <Box>
        
        <PostComponent isCenter={false} titulo={"Cofundadores"} subtitulo={"Área exclusiva"} content={<Forum />} icon={<BookmarkIcon sx={{ color: "gold", fontSize: "25px" }} />} />
        {coinCharter()}
    </Box>
    }

    const lastContent = () => {
        return <>
            <EstatisticasWidget />
            <CofundersWidget />
        </>
    }

    return <PageSchemaComponent topContent={<UserWidget userId={id} />} main={content()} lastContent={lastContent()}/>
}

export default CofunderPage;