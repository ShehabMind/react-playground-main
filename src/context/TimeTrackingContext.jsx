import React, { createContext, useState, useMemo } from "react";

export const TtContextData = createContext();

export const TtContext = ({ children }) => {
  const [usersTimeTrackingData, setUsersTimeTrackingData] = useState();
  return (
    <TtContextData.Provider
      value={[usersTimeTrackingData, setUsersTimeTrackingData]}
    >
      {children}
    </TtContextData.Provider>
  );
};
