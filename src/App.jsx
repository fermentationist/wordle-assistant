import { useState } from "react";
import Board from "./components/Board";
import Alert from "./components/Alert";
import "./App.css";


const intro = `Welcome to the Wordle Helper. To use, type or select your starting word, and then click the boxes to set their color to match Wordle's output. Then hit "Enter" to filter the list of remaining words.`;

function App() {
  const [showModal, setShowModal]  = useState(true);
  return (
    <div className="App">
      <Board wordLength={5} numTries={6}/>
      <Alert message={intro} showDialog={showModal} closeDialog={() => setShowModal(false)} />
    </div>
  );
}

export default App;
