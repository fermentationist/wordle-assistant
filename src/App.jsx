import { useState } from "react";
import Board from "./components/Board";
import Alert from "./components/Alert";
import styled from "styled-components";
import "./App.css";

const intro = `
  (1) Type or select your starting word.
  (2) Set the color of each letter to match Wordle's output, by clicking them.
  (3) Hit "ENTER" to filter the list of remaining words.
  (4) Repeat until solved or out of guesses.
`;

const Footer = styled.div`
  margin-top: 1em;
  display: inline-block;
  font-size: 0.75em;
  text-align: center;
`;

function App() {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="App">
      <Board wordLength={5} numTries={6} />
      <Alert
        message={intro}
        showDialog={showModal}
        closeDialog={() => setShowModal(false)}
        title="Wordle Assistant"
        style={{textAlign: "center"}}
      />
      <Footer>
        <a href="https://www.nytimes.com/games/wordle/index.html">
          Wordle - NYTimes
        </a>
        <br/>
        © 2022 <a href="https://dennis-hodges.com/">
          Dennis Hodges
        </a>
      </Footer>
    </div>
  );
}

export default App;
