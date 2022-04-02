function Guesses({ randomItem, guesses }) {
  let itemsInBuildTree = [];
  if (randomItem) {
    itemsInBuildTree = [randomItem.name];
    randomItem.children.map(child => {
      itemsInBuildTree = [...itemsInBuildTree, child.name];
      return child.children.map(
        gchild => (itemsInBuildTree = [...itemsInBuildTree, gchild.name])
      );
    });
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="my-3 white-text guess-section">
        {guesses.map((guess, i) => (
          <div className="row mx-2 px-2 justify-content-center" key={i}>
            <div className="col px-1">
              <div
                className={`guessed-box ${
                  itemsInBuildTree.some(item =>
                    guess.flatBuildTree.includes(item)
                  )
                    ? "right-guess"
                    : "wrong-guess"
                } ${randomItem.name === guess.item.name && "top-right-guess"}`}
              >
                <p className="guessed-text">
                  {i + 1}. {guesses[i].item.name}
                </p>
              </div>
            </div>
            <div className="col-3 px-1" style={{ minWidth: 38 }}>
              <img
                className="guessed-image"
                src={`https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${guess.item.image}`}
                height="38px"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guesses;
