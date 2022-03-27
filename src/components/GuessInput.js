import { useState } from "react";
import Select from "react-select";

function GuessInput({
  allItemNames,
  guesses,
  makeGuess,
  success,
  showSolution
}) {
  const [option, setOption] = useState("");

  const options = allItemNames.map(name => ({ value: name, label: name }));

  const handleSubmit = e => {
    e.preventDefault();
    if (options.some(o => o.value === option.value)) {
      setOption("");
      if (!guesses.includes(option.value)) {
        makeGuess(option.value);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="guess-section">
        {success ? (
          <div className="d-flex justify-content-center">
            <div className="alert alert-success">
              Correct! <b>{guesses[guesses.length - 1]}</b>
            </div>
          </div>
        ) : guesses.length < 8 ? (
          <form onSubmit={handleSubmit}>
            <div className="row px-2 justify-content-center">
              <div className="col-9">
                <Select
                  value={option}
                  onChange={setOption}
                  options={options}
                  onFocus={() => {}}
                  isDisabled={success}
                />
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={success}
                >
                  Guess
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="alert alert-danger">
            You've used your eight guesses!
            <br />
            <span className="link" onClick={showSolution}>
              Click to see solution
            </span>{" "}
            or refresh to retry.
          </div>
        )}
      </div>
    </div>
  );
}

export default GuessInput;
