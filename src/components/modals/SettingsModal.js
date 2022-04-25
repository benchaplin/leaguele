import Modal from "react-bootstrap/Modal";
import Switch from "react-switch";
import github from "../../images/github.png";

function SettingsModal({
  showSettings,
  handleCloseSettings,
  unlimitedGuesses,
  setUnlimitedGuesses,
  unlimitedGames,
  setUnlimitedGames
}) {
  return (
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
              &nbsp; <b>Unlimited mode</b> (unlimited games)
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
  );
}

export default SettingsModal;
