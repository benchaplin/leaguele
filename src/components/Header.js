import { useState } from "react";
import logo from "../images/leaguele.png";
import HelpModal from "./modals/HelpModal";
import SettingsModal from "./modals/SettingsModal";
import StatsModal from "./modals/StatsModal";

function Header({
  unlimitedGuesses,
  setUnlimitedGuesses,
  unlimitedGames,
  setUnlimitedGames,
  stats
}) {
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  const handleShowStats = () => setShowStats(true);
  const handleCloseStats = () => setShowStats(false);

  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  return (
    <>
      <div className="text-center header-container">
        <img height="45" src={logo} alt="" />
        <p
          className="header-icon header-question-icon pointer"
          onClick={handleShowHelp}
        >
          ❓
        </p>
        <p
          className="header-icon header-stats-icon pointer"
          onClick={handleShowStats}
        >
          📊
        </p>
        <p
          className="header-icon header-settings-icon pointer"
          onClick={handleShowSettings}
        >
          ⚙️
        </p>
      </div>
      <HelpModal showHelp={showHelp} handleCloseHelp={handleCloseHelp} />
      <StatsModal
        stats={stats}
        showStats={showStats}
        handleCloseStats={handleCloseStats}
      />
      <SettingsModal
        showSettings={showSettings}
        handleCloseSettings={handleCloseSettings}
        unlimitedGuesses={unlimitedGuesses}
        setUnlimitedGuesses={setUnlimitedGuesses}
        unlimitedGames={unlimitedGames}
        setUnlimitedGames={setUnlimitedGames}
      />
    </>
  );
}

export default Header;
