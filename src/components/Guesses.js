function Guesses({ guesses }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="my-3 white-text guess-section">
        {guesses.map((guess, i) => (
          <div className="guessed-container" key={i}>
            <p className="guessed-text">
              {i + 1}. {guesses[i]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guesses;
