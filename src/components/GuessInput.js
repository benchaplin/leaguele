import { useState } from "react";
import Select from "react-select";

function GuessInput({
  allItems,
  guesses,
  makeGuess,
  unlimitedGames,
  gameWon,
  gameLost,
  showSolution,
  newGame
}) {
  const [option, setOption] = useState("");

  const options = allItems.map(item => ({
    value: item,
    label: item.name
  }));

  const handleSubmit = e => {
    e.preventDefault();
    if (options.some(o => o.label === option.label)) {
      setOption("");
      if (!guesses.map(guess => guess.item.name).includes(option.value.name)) {
        makeGuess(option.value);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="guess-section">
        {gameLost && (
          <div className="alert alert-danger">
            You've used your six guesses!
          </div>
        )}
        <div className="d-flex">
          {gameLost && (
            <button
              className={`btn btn-blue w-48 ${unlimitedGames ? "" : "mx-auto"}`}
              onClick={showSolution}
            >
              Show solution
            </button>
          )}
          {unlimitedGames && (gameWon || gameLost) && (
            <button
              className={`btn btn-blue w-48 ${
                gameLost ? "ml-auto" : "mx-auto"
              }`}
              onClick={newGame}
            >
              Play again
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mx-2 px-2 justify-content-center">
            <div className="col px-1">
              <Select
                value={option}
                onChange={setOption}
                options={options}
                onFocus={() => {}}
                isDisabled={gameWon || gameLost}
              />
            </div>
            <div className="col-3 px-1">
              <button
                type="submit"
                className="btn btn-light"
                disabled={gameWon || gameLost}
              >
                Guess
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GuessInput;
