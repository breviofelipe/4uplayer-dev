import PageSchemaComponent from "../../components/page/PageSchemaComponent";
import PersonagensWidget from "scenes/widgets/personagens/PersonagensWidget";
import { useSelector } from "react-redux";
import PostComponent from "components/post/PostComponent";
import { FaTheaterMasks } from 'react-icons/fa';
import { useSearchParams } from "react-router-dom";
import UserWidget from "scenes/widgets/user/UserWidget";
import { Box, Divider, useMediaQuery } from "@mui/material";
import PostarTurmaWidget from "scenes/widgets/posts/PostarTurmaWidget";
import TurmaPostsWidget from "scenes/widgets/posts/TurmaPostsWidget";
import { useEffect } from "react";


const PersonagemPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const turma = useSelector((state) => state.turma);
    const [ searchparams ] = useSearchParams();
    const personagemId = searchparams.get("personagemId");
    const role = useSelector((state) => state.user.role);
    const picturePath = useSelector((state) => state.user.picturePath);
    const personagem = turma.espetaculo.personagens.filter(personagem => personagem.id === personagemId)[0];
    const atores = turma.atores.filter((actor) => actor.personagens.filter((personagem => personagem.id === personagemId))[0]);
    const ator = useSelector((state) => state.ator);
    const filterAtores = atores.length > 0 && atores.filter(actor => actor.id === ator?.id);

    useEffect(()=>{
        window.scrollTo(0,0);
    })

    const mainContent = () => {
        return <div>
            {content()}
            {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}
       </div>
    }
    const post = () => {
        return <><PostarTurmaWidget personagemPost={personagemId} picturePath={picturePath} />
        {isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}</>
    }

    const atorLista = () => {
        if(filterAtores.length > 0){
            return post()
        }
    }
    const content = () => {
        return <Box>
                {role === 'ADMIN' ? post() : atorLista()}
                <TurmaPostsWidget personagemPost turmaId={personagemId}/>
                
                </Box>
    }
    const topContent = () => {
        return <>
        <PostComponent titulo={personagem.nome} icon={<FaTheaterMasks size={36}/>}/>
        <div>
        { isNonMobileScreens && atores.map(ator => {
                        return <div><UserWidget notShowPersonagem={true} actorProfile userId={ator.id} key={ator.id} />{isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}</div>
                    })}
        </div>
        </>
    }

    const lastContent = () => {
        return <div>{isNonMobileScreens ? <PersonagensWidget listaPersonagens={turma.espetaculo.personagens} /> : 
         <>{atores.map(ator => {
            return <div><UserWidget notShowPersonagem={true} actorProfile userId={ator.id} key={ator.id} />{isNonMobileScreens ? <Box m={"2rem"} /> : <Divider />}</div>
        })}
        <PersonagensWidget listaPersonagens={turma.espetaculo.personagens} /></>
    }
    </div>
    }

    return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()}/>
}

export default PersonagemPage;