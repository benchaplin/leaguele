import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Switch from "react-switch";
import logo from "../images/leaguele.png";
import ex1 from "../images/ex1.png";
import ex2 from "../images/ex2.png";
import ex3 from "../images/ex3.png";
import github from "../images/github.png";

function Header({
  unlimitedGuesses,
  setUnlimitedGuesses,
  unlimitedGames,
  setUnlimitedGames
}) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleCloseHelp = () => setShowHelp(false);
  const handleShowHelp = () => setShowHelp(true);

  const handleCloseSettings = () => setShowSettings(false);
  const handleShowSettings = () => setShowSettings(true);

  return (
    <>
      <div className="text-center header-container">
        <img height="50" src={logo} alt="" />
        <p
          className="header-icon header-question-icon pointer"
          onClick={handleShowHelp}
        >
          ❓
        </p>
        <p
          className="header-icon header-settings-icon pointer"
          onClick={handleShowSettings}
        >
          ⚙️
        </p>
      </div>
      <Modal show={showHelp} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title>How to Play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Guess the mystery item in six tries.</li>
            <li>
              Guessing an item will reveal any items it shares with the mystery
              item.
            </li>
          </ul>
          For example, suppose the mystery item is <b>Black Cleaver</b>.
          Guessing <b>Manamune</b> might result in:
          <br />
          <div className="d-flex justify-content-center">
            <img width="100%" style={{ maxWidth: 280 }} src={ex1} alt="" />
          </div>
          Because <b>Long Sword</b> and <b>Caulfield's Warhammer</b> are both
          shared by <b>Manamune</b> and <b>Black Cleaver</b>:
          <div className="row">
            <div className="col">
              <img width="100%" src={ex2} alt="" />
            </div>
            <div className="col">
              <img width="100%" src={ex3} alt="" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleCloseHelp}>
            Get started!
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSettings} onHide={handleCloseSettings}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-inline-flex">
              <Switch
                onChange={() => setUnlimitedGuesses(!unlimitedGuesses)}
                checked={unlimitedGuesses}
              />
              <p className="mt-05">
                &nbsp; <b>Easy mode</b> (unlimited guesses)
              </p>
            </div>
          </div>
          <div>
            <div className="d-inline-flex">
              <Switch
                onChange={() => setUnlimitedGames(!unlimitedGames)}
                checked={unlimitedGames}
              />
              <p className="mt-05">
                &nbsp; <b>Unlimited mode</b> (unlimited games per day)
              </p>
            </div>
          </div>
        </Modal.Body>
        <div className="d-inline-flex p-3">
          <a href="https://github.com/benchaplin/leaguele">
            <img src={github} alt="" width="30px" />
          </a>
          &nbsp;
          <a className="mt-1" href="https://github.com/benchaplin/leaguele">
            GitHub
          </a>
        </div>
      </Modal>
    </>
  );
}

export default Header;
