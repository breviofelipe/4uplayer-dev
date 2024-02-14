import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import MemoryGameWidget from "scenes/widgets/games/memory/MemoryGameWidget";

const { default: PageSchemaComponent } = require("components/page/PageSchemaComponent")
const { default: QuestionsGameWidget } = require("scenes/widgets/games/questions/QuestionsGameWidget")

const GamePage = () => {

    const turma = useSelector((state) => state.turma);
    const role = useSelector((state) => state.user.role);
    const userId = useSelector((state) => state.user.id);

    const memoryGame = () => {
        if(role === "ACTOR"){
            const ator = turma.atores.filter((ator) => ator.userId === userId)[0];
            return <MemoryGameWidget player={ator.nome+' '+ ator.sobrenome} turmaId={turma.id} />
        } else {
            return <Box />
        }
    }

    return <PageSchemaComponent topContent={<QuestionsGameWidget />} main={memoryGame()}/>
}

export default GamePage;