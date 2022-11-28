import { useState } from "react";
import Board from "./components/Board";
import Alert from "./components/Alert";
import "./App.css";

const intro = `
  (1) Type or select a word.
  (2) Click the boxes to set their colors to match Wordle's output.
  (3) Hit "Enter" to filter the list of remaining words.
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
    </div>
  );
}

export default App;
