import { Typography } from "@mui/material";
import PageSchemaComponent from "components/page/PageSchemaComponent";
import PostComponent from "components/post/PostComponent";
import ExploreIcon from '@mui/icons-material/Explore';

const NotFound = () => {
  const content = () => {
    return <PostComponent titulo={"404 - Não encontrado"} content={<Typography>Conteúdo não encontrada!</Typography>} icon={<ExploreIcon fontSize="large" />} />
  }
    return <PageSchemaComponent main={content()} />
  }
export default NotFound;