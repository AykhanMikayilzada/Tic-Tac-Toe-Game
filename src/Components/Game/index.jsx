import React, { useState } from "react";
import { ChakraProvider, Heading, Highlight, Button } from "@chakra-ui/react";
import "../../assets/css/game.css";

const xImg =
  "https://icones.pro/wp-content/uploads/2022/05/icone-fermer-et-x-jaune.png";
const oImg = "https://www.clker.com/cliparts/3/p/k/V/g/k/yellow-o-md.png";

const initialBoard = Array(9).fill(null);
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Vertical
  [0, 4, 8],
  [2, 4, 6], // Diagonal
];

function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winningSequence, setWinningSequence] = useState([]);

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = newBoard.filter(Boolean).length % 2 === 0 ? "X" : "O";
      setBoard(newBoard);

      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
          newBoard[a] &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]
        ) {
          if (newBoard[a] === "X") {
            setPlayer1Score(player1Score + 1);
            setWinner("X");
            setWinningSequence(condition);
          } else if (newBoard[a] === "O") {
            setPlayer2Score(player2Score + 1);
            setWinner("O");
            setWinningSequence(condition);
          }
          return;
        }
      }
      if (!newBoard.includes(null)) {
        setWinner("No One");
      }
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningSequence([]);
  };

  const handleReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner(null);
    setBoard(initialBoard);
    setWinningSequence([]);
  };

  const getCellStyle = (index) => {
    if (winner && winningSequence.includes(index)) {
      return { border: "2px solid green" };
    }
    return {};
  };

  const getResultColor = () => {
    return winner === "No One" ? "red" : "green";
  };

  return (
    <>
      <ChakraProvider>
        <div className="gamescreen">
          <div className="main">
            <div className="Side">
              <Heading
                size="lg"
                fontSize="50px"
                maxWidth="300px"
                textColor="white"
              >
                Player 1
              </Heading>
              <Heading lineHeight="tall" mt="30px" textColor="white">
                <Highlight
                  query={["Score:"]}
                  styles={{
                    px: "2",
                    py: "1",
                    rounded: "full",
                    bg: "teal.100",
                    textColor: "black",
                  }}
                >
                  {"Score: " + player1Score}
                </Highlight>
              </Heading>
            </div>
            <div className="mainBorder">
              {board.map((value, index) => (
                <div
                  key={index}
                  className={`box ${winner && "disabled"}`}
                  style={{ ...getCellStyle(index) }}
                  onClick={() => handleClick(index)}
                >
                  {value === "X" && (
                    <img src={xImg} alt="X" width="150px" className="symbol" />
                  )}
                  {value === "O" && (
                    <img src={oImg} alt="O" width="130px" className="symbol" />
                  )}
                </div>
              ))}
            </div>
            <div className="Sİde">
              <Heading size="lg" fontSize="50px" maxWidth="300px" color="white">
                Player 2
              </Heading>
              <Heading lineHeight="tall" mt="30px" textColor="white">
                <Highlight
                  query={["Score:"]}
                  styles={{
                    px: "2",
                    py: "1",
                    rounded: "full",
                    bg: "teal.100",
                    textColor: "black",
                  }}
                >
                  {"Score: " + player2Score}
                </Highlight>
              </Heading>
            </div>
          </div>
          {winner && (
            <div className="result">
              <Heading mt="20px" color={getResultColor()}>
                {winner === "No One" ? "No One Wins!" : winner === "X" ? "Player 1 Wins!" : "Player 2 Wins!"}
              </Heading>
              <Button mt="20px" colorScheme="teal" onClick={handleRestart} margin="auto">
                Restart Game
              </Button>
              <Button mt="10px" colorScheme="red" onClick={handleReset} margin="auto">
                Reset Game
              </Button>
            </div>
          )}
        </div>
      </ChakraProvider>
    </>
  );
}

export default Game;
