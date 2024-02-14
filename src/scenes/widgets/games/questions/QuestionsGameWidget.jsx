
import "./QuestionsGameWidget.css";
import { Box, Typography} from "@mui/material";
import PostComponent from "components/post/PostComponent";
import PostButton from "components/PostButton";
import { useEffect, useState } from "react";
import Question from "./components/Question";

const QuestionsGameWidget = () => {  
    
    const titulo = "Verdadeiro ou Falso?";
    const subtitulo ="Sabe tudo sobre nosso espetáculos?";
    const [gameState, setGame] = useState();  
    const [perguntaRespondidas, setPerguntaRespondidas] = useState();
    useEffect(() => {
        setGame(start());
    }, []);
        
    const start = () => {
        const quest = () => {
            return <Question setGame={setGame} next={quest} setPerguntaRespondidas={setPerguntaRespondidas}/>
        }
       return <Box>
            <Typography mb={"2rem"} variant="h4">Teste seus conhecimentos sobre o roteiro do Alex Capelossa, com afirmações extraidas do texto.</Typography>
            <PostButton text={"INICIAR"} onClick={() => {
                setGame(quest());
            }} />
        </Box>
    };
    
   
    return <PostComponent titulo={titulo} subtitulo={subtitulo} content={gameState} msg={perguntaRespondidas}/>
}

export default QuestionsGameWidget;