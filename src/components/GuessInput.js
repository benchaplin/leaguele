import React, { useState } from "react";
import Select from "react-select";

function GuessInput({
  allItems,
  guesses,
  makeGuess,
  unlimitedGuesses,
  unlimitedGames,
  gameWon,
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

  const gameLost = !unlimitedGuesses && guesses.length >= 6 && !gameWon;

  return (
    <div className="d-flex justify-content-center">
      <div className="guess-section">
        {gameLost && (
          <div className="alert alert-danger">
            You've used your six guesses!
          </div>
        )}
        {(gameLost || (gameWon && unlimitedGames)) && (
          <div className="mb-3 d-flex">
            {gameLost && (
              <button
                className={`btn show-solution w-48 ${
                  unlimitedGames ? "" : "mx-auto"
                }`}
                onClick={showSolution}
              >
                Show solution
              </button>
            )}
            {unlimitedGames && (
              <button
                className={`btn play-again w-48 ${
                  gameLost ? "ml-auto" : "mx-auto"
                }`}
                onClick={newGame}
              >
                Play again
              </button>
            )}
          </div>
        )}
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
