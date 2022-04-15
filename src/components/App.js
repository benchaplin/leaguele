import React from "react";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Header from "./Header";
import BuildTree from "./BuildTree";
import GuessInput from "./GuessInput";
import Guesses from "./Guesses";
import { getAllItems, getRandomItem } from "../services/itemService";

function App() {
  const [allItems, setAllItems] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [unlimitedGuesses, setUnlimitedGuesses] = useLocalStorage(
    "unlimitedGuesses",
    false
  );
  const [unlimitedGames, setUnlimitedGames] = useLocalStorage(
    "unlimitedGames",
    false
  );

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

  const initGame = allItems => {
    setGuesses([]);
    setShowSolution(false);
    const randomItem = getRandomItem(allItems, unlimitedGames);
    setRandomItem(randomItem);
  };

  useEffect(() => {
    getAllItems().then(items => {
      setAllItems(items);
      initGame(items);
    });
  }, []);

  const gameWon =
    randomItem &&
    guesses.map(guess => guess.item.name).includes(randomItem.name);

  return (
    <div className="container p-0" style={{ maxWidth: 600 }}>
      <div style={{ height: "10vh" }}>
        <Header
          unlimitedGuesses={unlimitedGuesses}
          setUnlimitedGuesses={setUnlimitedGuesses}
          unlimitedGames={unlimitedGames}
          setUnlimitedGames={setUnlimitedGames}
        />
      </div>
      <div style={{ height: "90vh" }}>
        <BuildTree
          randomItem={randomItem}
          guesses={guesses}
          gameWon={gameWon}
          showSolution={showSolution}
        />
        <GuessInput
          allItems={allItems}
          guesses={guesses}
          makeGuess={makeGuess}
          unlimitedGuesses={unlimitedGuesses}
          unlimitedGames={unlimitedGames}
          gameWon={gameWon}
          showSolution={() => setShowSolution(true)}
          newGame={() => initGame(allItems)}
        />
        <Guesses randomItem={randomItem} guesses={guesses} />
      </div>
    </div>
  );
}

export default App;
