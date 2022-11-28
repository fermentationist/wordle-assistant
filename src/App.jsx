import { useState } from "react";
import Board from "./components/Board";
import Alert from "./components/Alert";
import styled from "styled-components";
import "./App.css";

const intro = `
  (1) Type or select a word.
  (2) Click the boxes to set their colors to match Wordle's output.
  (3) Hit "Enter" to filter the list of remaining words.
`;

const Credits = styled.div`
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
      <Credits>
        © 2022 <a href="https://dennis-hodges.com/">Dennis Hodges</a>
      </Credits>
    </div>
  );
}

export default App;
