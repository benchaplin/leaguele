import Modal from "react-bootstrap/Modal";
import BarChart from "../BarChart";

function StatsModal({ stats, showStats, handleCloseStats }) {
  return (
    <Modal show={showStats} onHide={handleCloseStats}>
      <Modal.Header closeButton>
        <Modal.Title>Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Played</th>
              <th>Wins</th>
              <th>Streak</th>
              <th>Max streak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.played}</td>
              <td>{stats.guessDist.reduce((a, b) => a + b, 0)}</td>
              <td>{stats.streak}</td>
              <td>{stats.maxStreak}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <>
        <h5 className="mx-4">Guess Distribution</h5>
        <div className="d-flex justify-content-center">
          <BarChart
            width={300}
            height={300}
            data={stats.guessDist.map((e, i) => ({
              text: `${i + 1}`,
              value: e
            }))}
          />
        </div>
      </>
    </Modal>
  );
}

export default StatsModal;
