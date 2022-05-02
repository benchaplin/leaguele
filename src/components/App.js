import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useDailyLocalStorage from "../hooks/useDailyLocalStorage";
import Header from "./Header";
import BuildTree from "./BuildTree";
import GuessInput from "./GuessInput";
import Guesses from "./Guesses";
import { getAllItems, getRandomItem } from "../services/itemService";

function App() {
  const [allItems, setAllItems] = useState([]);
  const [playingBonus, setPlayingBonus] = useState(false);
  const [dailyRandomItem, setDailyRandomItem] = useDailyLocalStorage(
    "dailyRandomItem",
    null
  );
  const [bonusRandomItem, setBonusRandomItem] = useState(null);
  const [dailyGuesses, setDailyGuesses] = useDailyLocalStorage(
    "dailyGuesses",
    []
  );
  const [bonusGuesses, setBonusGuesses] = useState([]);
  const [dailyGameWon, setDailyGameWon] = useDailyLocalStorage(
    "dailyGameWon",
    false
  );
  const [bonusGameWon, setBonusGameWon] = useState(false);
  const [dailyGameLost, setDailyGameLost] = useDailyLocalStorage(
    "dailyGameLost",
    false
  );
  const [bonusGameLost, setBonusGameLost] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [stats, setStats] = useLocalStorage("stats", {
    played: 0,
    guessDist: [0, 0, 0, 0, 0, 0],
    streak: 0,
    maxStreak: 0
  });
  const [unlimitedGuesses, setUnlimitedGuesses] = useLocalStorage(
    "unlimitedGuesses",
    false
  );
  const [unlimitedGames, setUnlimitedGames] = useLocalStorage(
    "unlimitedGames",
    false
  );

  useEffect(() => {
    getAllItems().then(items => {
      setAllItems(items);
      if (!dailyRandomItem) initDailyGame(items, false);
    });
  }, []);

  const initDailyGame = allItems => {
    setDailyGameWon(false);
    setDailyGameLost(false);
    setShowSolution(false);
    setDailyGuesses([]);
    const randomItem = getRandomItem(allItems, true);
    setDailyRandomItem(randomItem);
  };

  const initBonusGame = allItems => {
    setPlayingBonus(true);
    setBonusGameWon(false);
    setBonusGameLost(false);
    setShowSolution(false);
    setBonusGuesses([]);
    const randomItem = getRandomItem(allItems, false);
    setBonusRandomItem(randomItem);
  };

  const makeGuess = (
    guess,
    randomItem,
    guesses,
    setGuesses,
    setGameWon,
    setGameLost,
    shouldSetStats
  ) => {
    let itemsInBuildTree = [guess.name];
    guess.children.map(child => {
      itemsInBuildTree = [...itemsInBuildTree, child.name];
      return child.children.map(
        gchild => (itemsInBuildTree = [...itemsInBuildTree, gchild.name])
      );
    });

    const newGuesses = [
      ...guesses,
      {
        item: guess,
        flatBuildTree: itemsInBuildTree
      }
    ];
    setGuesses(newGuesses);
    if (newGuesses.map(guess => guess.item.name).includes(randomItem.name)) {
      setGameWon(true);
      if (!unlimitedGuesses && shouldSetStats) {
        setStats(prevStats => ({
          played: prevStats.played + 1,
          guessDist: prevStats.guessDist.map((e, i) =>
            newGuesses.length === i + 1 ? e + 1 : e
          ),
          streak: prevStats.streak + 1,
          maxStreak:
            prevStats.streak + 1 > prevStats.maxStreak
              ? prevStats.streak + 1
              : prevStats.maxStreak
        }));
      }
    } else if (!unlimitedGuesses && newGuesses.length === 6) {
      setGameLost(true);
      if (shouldSetStats) {
        setStats(prevStats => ({
          played: prevStats.played + 1,
          guessDist: prevStats.guessDist,
          streak: 0,
          maxStreak: prevStats.maxStreak
        }));
      }
    }
  };

  const makeGuessImpl = playingBonus
    ? guess =>
        makeGuess(
          guess,
          bonusRandomItem,
          bonusGuesses,
          setBonusGuesses,
          setBonusGameWon,
          setBonusGameLost,
          false
        )
    : guess =>
        makeGuess(
          guess,
          dailyRandomItem,
          dailyGuesses,
          setDailyGuesses,
          setDailyGameWon,
          setDailyGameLost,
          true
        );

  const randomItem = playingBonus ? bonusRandomItem : dailyRandomItem;
  const guesses = playingBonus ? bonusGuesses : dailyGuesses;

  const gameWon = playingBonus ? bonusGameWon : dailyGameWon;
  const gameLost = playingBonus ? bonusGameLost : dailyGameLost;

  return (
    <div className="container p-0" style={{ maxWidth: 600 }}>
      <div style={{ height: 80 }}>
        <Header
          unlimitedGuesses={unlimitedGuesses}
          setUnlimitedGuesses={setUnlimitedGuesses}
          unlimitedGames={unlimitedGames}
          setUnlimitedGames={setUnlimitedGames}
          stats={stats}
        />
      </div>
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <BuildTree
          randomItem={randomItem}
          guesses={guesses}
          gameWon={gameWon}
          showSolution={showSolution}
        />
        <GuessInput
          allItems={allItems}
          guesses={guesses}
          makeGuess={makeGuessImpl}
          unlimitedGames={unlimitedGames}
          gameWon={gameWon}
          gameLost={gameLost}
          showSolution={() => setShowSolution(true)}
          newGame={() => initBonusGame(allItems)}
        />
        <Guesses randomItem={randomItem} guesses={guesses} />
      </div>
    </div>
  );
}

export default App;
