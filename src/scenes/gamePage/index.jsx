import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostBuild from "components/postConstruction/PostConstruction";
import { useSelector } from "react-redux";
import MetaMaskWidget from "scenes/widgets/metamask/MetaMaskWidget";
import UserWidget from "scenes/widgets/user/UserWidget";


const GamePage = () => {
    const { id } = useSelector((state) => state.user);
    return <PageSchemaComponent topContent={<UserWidget userId={id} />} main={<PostBuild titulo={"Games"} subTitulo={"Premios em PLC"} />} lastContent={<MetaMaskWidget />}/>
}

export default GamePage;