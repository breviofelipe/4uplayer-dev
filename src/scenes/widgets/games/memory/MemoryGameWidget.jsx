import "./MemoryGameWidget.css";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle,
    useTheme,
    Box,
    Typography,
    Divider,
    useMediaQuery
  } from "@mui/material";

import Card from "./components/Card";
import { useEffect, useState, useRef } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSelector } from "react-redux";
import LoadingComponent from "components/loading/Loading";

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}



const MemoryGameWidget = ({ turmaId, player }) => {
  const { palette } = useTheme();
  const [uniqueElementsArray, setUniqueElementsArray] = useState([])
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [cards, setCards] = useState(false);
      const [openCards, setOpenCards] = useState([]);
      const [clearedCards, setClearedCards] = useState({});
      const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
      const [moves, setMoves] = useState(0);
      const [showModal, setShowModal] = useState(false);
      const [bestScore, setBestScore] = useState();
      const [bestPlayer, setBestPlayer] = useState();
      const timeout = useRef(null);
      // const url = 'http://localhost:5000';
      const url = 'https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com';
      const disable = () => {
        setShouldDisableAllCards(true);
      };
      const enable = () => {
        setShouldDisableAllCards(false);
      };
    
      const patchBestScore = async (player, highScore) => {
        const body = {"player" : player, "score" : highScore};
        const response = await fetch(url+`/turmas/${turmaId}/games`,{
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body)
        });
       try{
        const res = await response.json();
        setUniqueElementsArray(res.dataGame);       
        setBestScore(res.bestScore);
        setBestPlayer(res.bestPlayer.toUpperCase());
       } catch (err) {
        console.log(err);
       }
      }
      const checkCompletion = () => {
        if (Object.keys(clearedCards).length === cards.length /2 ) {
          setShowModal(true);
          const highScore = Math.min(moves, bestScore);
          if(bestScore > highScore){
            setBestScore(highScore);
            patchBestScore(player, highScore);
          }
        }
      };
      const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
          setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
          setOpenCards([]);
          return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
          setOpenCards([]);
        }, 500);
      };
      const handleCardClick = (index) => {
        if (openCards.length === 1) {
          setOpenCards((prev) => [...prev, index]);
          setMoves((moves) => moves + 1);
          disable();
        } else {
          clearTimeout(timeout.current);
          setOpenCards([index]);
        }
      };
    
      const getCards = async () => {
        const response = await fetch(url+`/turmas/${turmaId}/games`,{
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
       try{
        const res = await response.json();
        setUniqueElementsArray(res.dataGame);       
        setBestScore(res.bestScore);
        setBestPlayer(res.bestPlayer.toUpperCase());
       } catch (err) {
        console.log(err);
       }
      }

      
      useEffect(() => {
       getCards();
      }, [turmaId]);

      useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [openCards]);
    
      useEffect(() => {
        checkCompletion();
      }, [clearedCards]);

      const checkIsFlipped = (index) => {
        return openCards.includes(index);
      };

     useEffect(() => {
        setCards(shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray)))
      }
    ,[uniqueElementsArray]);
    
      const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
      };
    
      const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
        // patchBestScore("Felipe Brevio", "20")
      };

    const game = () => {
      return cards.map((card, index) => {
        return (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(card)}
            isFlipped={checkIsFlipped(index)}
            onClick={handleCardClick}
          />
        );
      })};

      const MemoryComponent = () => {
        return <WidgetWrapper mobile={!isNonMobileScreens} className="memory-game">
        <FlexBetween gap="1rem" mb={"0.5rem"}>
            <FlexBetween gap="1rem">
                <SportsEsportsIcon fontSize="large" />
                
                <Box>
                <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                    "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                    },
                }}
                >
                Cade o personagem?
                </Typography>
                <Typography color={medium}>Encontre os personagens com o menor número de movimentos.</Typography>
            </Box>

            </FlexBetween>
        </FlexBetween>
      <Divider />
      <Box className="container">
        { game() }
      </Box>
      <footer>
        <div className="score">
         {moves > 0 &&  <div className="moves">
            <span className="bold">Movimentos:</span> {moves}
          </div>}
          
        </div>
       {!!bestPlayer &&  <div className="score"> <div className="moves">
          🏆<span className="bold"> Melhor jogador: </span> {bestPlayer}
          { bestScore < 1000 && (
            <div className="score">
              <div className="high-score">
                <span className="bold">{bestScore} movimentos.</span> 
              </div>
            </div>
          )}
          </div>
        </div>}
        {moves > 0 && <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Reiniciar
          </Button>
        </div>}
      </footer>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Uhuuuuu!!!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você completou o desafio com {moves} movimentos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Reiniciar
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
      }
 
    return ( <div> {cards ? MemoryComponent() : <WidgetWrapper><LoadingComponent /></WidgetWrapper>}</div>);
};



export default MemoryGameWidget;