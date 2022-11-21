import React, { useContext } from "react";
import { TtContextData } from "../../context/TimeTrackingContext";

function TimeTrackingsView() {
  const [usersTimeTrackingData, setUsersTimeTrackingData] =
    useContext(TtContextData);
  return <div>TimeTrackingsView</div>;
}

export default TimeTrackingsView;
