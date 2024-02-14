import CountdownTimer from "components/countdownTimer/CountdownTimer";
import PostComponent from "../../../components/post/PostComponent";
import { FaTheaterMasks } from 'react-icons/fa';

const EstreiaWidget = () => {

        return <PostComponent icon={<FaTheaterMasks size={36}/>} titulo={"Contagem regressiva..."} subtitulo={"Faltam poucos dias para a grande estreia"} content={<CountdownTimer targetDate={"2023-11-27T19:00:00.000+00:00"} />} />
}

export default EstreiaWidget;