import PageSchemaComponent from "components/page/PageSchemaComponent";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/user/UserWidget";
import PostComponent from "components/post/PostComponent";
import Forum from "components/forum";
import CofundersWidget from "scenes/widgets/cofunder/CofundersWidget";
import EstatisticasWidget from "scenes/widgets/estatisticas/EstatisticasWidget";
import { Box } from "@mui/material";


const CofunderPage = () => {
    const { id } = useSelector((state) => state.user);
    const content = () => {
    return <Box>
        
        <PostComponent isCenter={false} titulo={"Cofundadores"} subtitulo={"Área exclusiva ⛏️ Em construção..."} content={<Forum />} icon={<BookmarkIcon sx={{ color: "gold", fontSize: "25px" }} />} />
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