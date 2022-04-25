import Modal from "react-bootstrap/Modal";

function StatsModal({ showStats, handleCloseStats }) {
  return (
    <Modal show={showStats} onHide={handleCloseStats}>
      <Modal.Header closeButton>
        <Modal.Title>Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>hi</div>
      </Modal.Body>
    </Modal>
  );
}

export default StatsModal;
