import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AtoresWidget from "scenes/widgets/atores/AtoresWidget";
import TurmaWidget from "scenes/widgets/turmas/TurmaWidget";
import UserWidget from "scenes/widgets/user/UserWidget";
import FormMasks from "./Form";
import PageSchemaComponent from "components/page/PageSchemaComponent";


const ActorPage = () => {
  
  const [ searchparams ] = useSearchParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const actorId = searchparams.get("actorId");
  const [actorUserPicturePath, setActorUserPicturePath] = useState();
  const [actorOpnions, setActorOpnions] = useState();
  const turma = useSelector((state) => state.turma);
  const myProfile = useSelector((state) => state.user.actor) === actorId;
  
    useEffect(() => {
      window.scrollTo(0,0);
      const ator = turma.atores.filter((ator) => ator.id === actorId)[0];
      const picture = ator.userPicturePath;
      setActorUserPicturePath(picture);
      const opnions = ator.opnions;
      setActorOpnions(opnions);
  },[searchparams, turma])

  const topContent = () => {
    return <><UserWidget actorProfile userId={actorId} picturePath={actorUserPicturePath} /></>
  }

  const mainContent = () => {
    return <>{!myProfile && <FormMasks actorId={actorId} opnions={actorOpnions}/>}
              <TurmaWidget turmaId={turma.turmaId} />
              {isNonMobileScreens ?  <Box m="2rem 0" /> : <Divider />}
              </>
  }

  const lastContent = () => {
    return <><AtoresWidget listaAtores={turma.atores} />          
    {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
    </>
  }

  return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} />
};



export default ActorPage;
