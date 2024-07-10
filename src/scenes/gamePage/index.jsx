import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostBuild from "components/postConstruction/PostConstruction";

import { useSelector } from "react-redux";
import MetaMaskWidget from "scenes/widgets/metamask/MetaMaskWidget";
import UserWidget from "scenes/widgets/user/UserWidget";
import SnakeWidget from "../widgets/games/snake/SnakeWidget";
import PostComponent from "components/post/PostComponent";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const GamePage = () => {
    const { id } = useSelector((state) => state.user);
    const content = () => {
        return <PostComponent titulo={"PLC Snake ⛏️ Em construção..."} subtitulo={"Ganhe PLS's grátis!"} content={<SnakeWidget />} isCenter={false} icon={<SportsEsportsIcon fontSize="large" />} />
    // return <PostBuild titulo={"Games"} subTitulo={"Premios em PLC"} />
    }
    return <PageSchemaComponent topContent={<UserWidget userId={id} />} main={content()} lastContent={<MetaMaskWidget />}/>
}

export default GamePage;