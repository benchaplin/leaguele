import { useState } from "react";
import Select from "react-select";

function GuessInput({ allItems, guesses, makeGuess, success, showSolution }) {
  const [option, setOption] = useState("");

  const options = allItems.map(item => ({
    value: item.image,
    label: item.name
  }));

  const handleSubmit = e => {
    e.preventDefault();
    if (options.some(o => o.value === option.value)) {
      setOption("");
      if (!guesses.map(guess => guess.label).includes(option.label)) {
        makeGuess(option);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="guess-section">
        {!success && guesses.length >= 8 && (
          <div className="alert alert-danger">
            You've used your eight guesses!
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
                isDisabled={success || guesses.length >= 8}
              />
            </div>
            <div className="col-3 px-1">
              <button
                type="submit"
                className="btn btn-light"
                disabled={success || guesses.length >= 8}
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
