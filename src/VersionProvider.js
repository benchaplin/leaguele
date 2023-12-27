import React, { createContext, useState, useEffect } from "react";
import { getLatestVersion } from "./services/itemService";

const VersionContext = createContext();

const VersionProvider = ({ children }) => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const ddragonVersion = await getLatestVersion();
        setVersion(ddragonVersion);
      } catch (error) {
        console.error("Failed to fetch version:", error);
      }
    };

    fetchVersion();
  }, []);

  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  );
};

export { VersionContext, VersionProvider };
