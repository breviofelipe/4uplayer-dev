
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import Masks from "components/masks/Masks";
import { createSearchParams, useNavigate } from "react-router-dom";

const AtorWidget = ({
    id,
    turmaId,
    nome,
    sobrenome,
    personagens,
    userPicturePath,
    estrelas,
    pontualidade,
    trabalhoEquipe,
    criatividade
  }) => {


  const { palette } = useTheme();

  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();
  
  return (<FlexBetween>
  <FlexBetween gap="1rem">
    <UserImage image={userPicturePath} size="55px" />
    <Box
      onClick={() => { 
        navigate({
          pathname:`/ator/`, search: createSearchParams({ 'actorId': id }).toString()
        })
      }}
    >
      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        {nome} {sobrenome}
      </Typography>
      {personagens && personagens.map((personagem) => {
        return  <Typography key={personagem.id} color={medium} fontSize="0.75rem">
                  {personagem.nome}
                </Typography>
        }
      )
      }
      <Typography color={medium} fontSize="0.75rem"><Masks quantidade={estrelas} /></Typography>
    </Box>
    <Divider />
  </FlexBetween>
</FlexBetween>);
}

export default AtorWidget;
