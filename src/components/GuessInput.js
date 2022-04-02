import { useState } from "react";
import Select from "react-select";

function GuessInput({
  allItems,
  guesses,
  makeGuess,
  unlimitedGuesses,
  success,
  showSolution
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
        {!unlimitedGuesses && !success && guesses.length >= 6 && (
          <div className="alert alert-danger">
            You've used your six guesses!
            <br />
            <span className="link" onClick={showSolution}>
              Click to see solution
            </span>{" "}
            or refresh to retry.
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
                isDisabled={
                  success || (!unlimitedGuesses && guesses.length >= 6)
                }
              />
            </div>
            <div className="col-3 px-1">
              <button
                type="submit"
                className="btn btn-light"
                disabled={success || (!unlimitedGuesses && guesses.length >= 6)}
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
