import React from "react";
import { Link } from "react-router-dom";
import { ChakraProvider, ButtonGroup, Button } from "@chakra-ui/react";
import "../../assets/css/home.css";

function Home() {
  return (
    <ChakraProvider>
      <div className="body">
        <p>TicTacToe Game</p>
        <ButtonGroup gap="4" display="flex" justifyContent="center">
          <Button
            as={Link} // Link bileşeni olarak kullanarak sayfa geçişini sağlıyoruz
            to="/game"
            size="lg"
            colorScheme="blackAlpha"
            mt="100px"
          >
            Start Game
          </Button>
        </ButtonGroup>
      </div>
    </ChakraProvider>
  );
}

export default Home;
