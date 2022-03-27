import { useState, useEffect } from "react";
import Header from "./components/Header";
import BuildTree from "./components/BuildTree";
import GuessInput from "./components/GuessInput";
import Guesses from "./components/Guesses";
import { getRandomItemBuildTree, getAllItemNames } from "./lib/ddragonClient";

function App() {
  const [itemBuildTree, setItemBuildTree] = useState(null);
  const [allItemNames, setAllItemNames] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const appendGuess = guess => setGuesses([...guesses, guess]);

  useEffect(() => {
    getRandomItemBuildTree(setItemBuildTree);
    getAllItemNames(setAllItemNames);
  }, []);

  const success = itemBuildTree && guesses.includes(itemBuildTree.name);

  return (
    <div className="container p-0" style={{ maxWidth: 600 }}>
      <div style={{ height: "10vh" }}>
        <Header />
      </div>
      <div style={{ height: "90vh" }}>
        <BuildTree
          itemBuildTree={itemBuildTree}
          guesses={guesses}
          showSolution={showSolution}
        />
        <GuessInput
          allItemNames={allItemNames}
          guesses={guesses}
          makeGuess={appendGuess}
          success={success}
          showSolution={() => setShowSolution(true)}
        />
        <Guesses guesses={guesses} />
      </div>
    </div>
  );
}

export default App;
