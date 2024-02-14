import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AtoresWidget from "scenes/widgets/atores/AtoresWidget";
import PersonagensWidget from "scenes/widgets/personagens/PersonagensWidget";
import PostarTurmaWidget from "scenes/widgets/posts/PostarTurmaWidget";

import UserWidget from "scenes/widgets/user/UserWidget";
import TurmaPostsWidget from "scenes/widgets/posts/TurmaPostsWidget";
import { setAtor, setTurma } from "state";
import TurmaWidget from "scenes/widgets/turmas/TurmaWidget";
import PageSchemaComponent from "components/page/PageSchemaComponent";
import EstreiaWidget from "scenes/widgets/turmas/EstreiaWidget";


const SpectaclePage = () => {
  
  const [ searchparams ] = useSearchParams();
  const turmaId = searchparams.get("turmaId");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const turmas = useSelector((state) => state.turmas);
  const role = useSelector((state) => state.user.role);
  const [turmaInfo, setTurmaInfo] = useState();
  const userId = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);
  const picturePath = useSelector((state) => state.user.picturePath);
  const dispatch = useDispatch();
  
  const getEspetaculo = () => {
    window.scrollTo(0,0);
    const data = turmas.filter((turma) => turma.turmaId === turmaId);
    let ator = null;
    if(data != undefined && role === 'ACTOR'){
      try {
        ator = data[0].atores?.filter((ator) => ator.userId === userId)[0];
        dispatch(setAtor({ ator: ator }));
      } catch ( err ){
        console.log(err);
      }
    }
    if(data !== undefined){
      setTurmaInfo(data[0]);
      dispatch(setTurma({ turma: data[0] }));
    }
  };

  useEffect(() => {
    getEspetaculo();
  },[turmaId])

  const topContent = () => {
    return <>{role === "ACTOR" && <div><UserWidget actorProfile userId={user.actor} />{isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}</div>}
    <TurmaWidget turmaId={turmaId} /></>
  }

  const mainContent = () => {

    const post = () => {
      return <div>
        
        {!isNonMobileScreens && <Divider />}
        {turmaInfo && <PostarTurmaWidget turmaId={turmaInfo.id} picturePath={picturePath} />}
        {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}</div>
    }

    return <>
          { role === 'ADMIN' && post()}
          {/* <EstreiaWidget /> */}
          {turmaInfo && <PersonagensWidget listaPersonagens={turmaInfo.espetaculo.personagens} /> }
          {isNonMobileScreens ? <Box m="2rem 0" /> : <Divider />}
          {turmaInfo && <TurmaPostsWidget picturePath={picturePath} turmaId={turmaInfo.id}/>}
    </>
  }

  const lastContent = () => {
      return <>{turmaInfo && <AtoresWidget listaAtores={turmaInfo.atores} />}</> 
  }
   return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} /> 
};

export default SpectaclePage;
