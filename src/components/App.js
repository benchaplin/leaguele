import { useState, useEffect } from "react";
import Header from "./Header";
import BuildTree from "./BuildTree";
import GuessInput from "./GuessInput";
import Guesses from "./Guesses";
import { getAllItems } from "../services/api/ddragonClient";

function App() {
  const [allItems, setAllItems] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [unlimitedGuesses, setUnlimitedGuesses] = useState(false);

  const makeGuess = guess => {
    let itemsInBuildTree = [guess.name];
    guess.children.map(child => {
      itemsInBuildTree = [...itemsInBuildTree, child.name];
      return child.children.map(
        gchild => (itemsInBuildTree = [...itemsInBuildTree, gchild.name])
      );
    });

    setGuesses([
      ...guesses,
      {
        item: guess,
        flatBuildTree: itemsInBuildTree
      }
    ]);
  };

  useEffect(() => {
    getAllItems(setAllItems, setRandomItem);
  }, []);

  const success =
    randomItem &&
    guesses.map(guess => guess.item.name).includes(randomItem.name);

  return (
    <div className="container p-0" style={{ maxWidth: 600 }}>
      <div style={{ height: "10vh" }}>
        <Header
          unlimitedGuesses={unlimitedGuesses}
          setUnlimitedGuesses={setUnlimitedGuesses}
        />
      </div>
      <div style={{ height: "90vh" }}>
        <BuildTree
          randomItem={randomItem}
          guesses={guesses}
          success={success}
          showSolution={showSolution}
        />
        <GuessInput
          allItems={allItems}
          guesses={guesses}
          makeGuess={makeGuess}
          unlimitedGuesses={unlimitedGuesses}
          success={success}
          showSolution={() => setShowSolution(true)}
        />
        <Guesses randomItem={randomItem} guesses={guesses} />
      </div>
    </div>
  );
}

export default App;
