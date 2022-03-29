import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import logo from "../images/leaguele.png";
import example from "../images/example.png";

function Header() {
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
            <li>Guess the top level item in eight tries.</li>
            <li>
              Guess an item and it will appear anywhere it exists in the build
              tree.
            </li>
          </ul>
          For example, guessing "Long Sword" might result in:
          <br />
          <div className="d-flex justify-content-center">
            <img width="400" src={example} alt="" />
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
          <i>Configurable options coming soon...</i>
          <ul>
            <li>
              <a href="https://github.com/benchaplin/leaguele">GitHub</a>
            </li>
            <li>
              <a href="mailto:benchaplin@protonmail.ch">Contact</a>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
