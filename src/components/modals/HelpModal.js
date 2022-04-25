import Modal from "react-bootstrap/Modal";
import ex1 from "../../images/ex1.png";
import ex2 from "../../images/ex2.png";
import ex3 from "../../images/ex3.png";

function HelpModal({ showHelp, handleCloseHelp }) {
  return (
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
        For example, suppose the mystery item is <b>Black Cleaver</b>. Guessing{" "}
        <b>Manamune</b> might result in:
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
  );
}

export default HelpModal;
