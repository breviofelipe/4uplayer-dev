import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostBuild from "components/postConstruction/PostConstruction";
import { useParams } from "react-router-dom";

export default function NoAuthPage () {

    const { code } = useParams();
    

    const topContent = () => {
        
    }
    const mainContent = () => {
        return <PostBuild titulo={"Página Guest"} subTitulo={code} />
    }
    const lastContent = () => {
        
    }
    return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} />
}