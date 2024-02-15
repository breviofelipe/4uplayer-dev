import PostComponent from "components/post/PostComponent";
import Groups3Icon from '@mui/icons-material/Groups3';



const PostBuild = ({titulo, subTitulo, }) => {
    return <PostComponent titulo={titulo} subtitulo={subTitulo} content={"⛏️ Em construção..."} icon={<Groups3Icon fontSize="large" />} />
}

export default PostBuild;