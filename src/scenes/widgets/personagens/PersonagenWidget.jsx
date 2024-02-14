
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { FaTheaterMasks } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
const PersonagemWidget = ({
    id,
    nome,
    notShowActor = false
  }) => {


  const { palette } = useTheme();
  const turma = useSelector((state) => state.turma);
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  if (turma === undefined) return null;
  
  // const ator = turma.atores.filter((actor) => actor.personagens.filter((personagem => personagem.id === id))[0])[0];
  const atores = turma.atores.filter((actor) => actor.personagens.filter((personagem => personagem.id === id))[0]);
  return (<FlexBetween>
    <FlexBetween gap="1rem">
    <Box width="50px" height="50px"> 
      <FaTheaterMasks size={36} />
    </Box>

   <Box>
   <Box minWidth="10rem" onClick={() => navigate({pathname: "/personagem", search: createSearchParams({ 'personagemId': id }).toString()})} >
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
        {nome}
      </Typography>
      </Box>
        {!notShowActor && atores && atores.map( ator => {
          return  <div><Box onClick={() => {
            navigate({
              pathname:`/ator/`, search: createSearchParams({ 'actorId': ator.id }).toString()
            })
    
          }}><Typography color={medium} fontSize="0.75rem" 
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}>
                        {ator.nome}
                     </Typography>
                     </Box>
                     </div>
        })
                 }
   </Box>
    
    </FlexBetween>
    </FlexBetween>
    );
}

export default PersonagemWidget;
