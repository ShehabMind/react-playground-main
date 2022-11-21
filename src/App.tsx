import React, { useContext } from "react";
import "./App.css";
import Api, { User } from "@timetac/js-client-library";
import { environment, authCredentials } from "./apiConfig";
import { useEffect, useState } from "react";
import { TtContextData } from "./context/TimeTrackingContext";
import { TimeTrackingScreen } from "./components/TimeTrackings";
function App() {
  const api = new Api(environment);
  const [usersTimeTrackingData, setUsersTimeTrackingData] =
    useContext(TtContextData);
  const [userData, setUserData] = useState<User>();

  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    if (!authed) {
      api.authentication.login(authCredentials).then((tokensData) => {
        api.authentication.setTokens(tokensData);
        setAuthed(true);
      });
    }
  }, [authed, api.authentication]);

  useEffect(() => {
    if (authed && !userData) {
      api.users.readMe().then((meData) => {
        setUserData(meData);
      });
      api.timeTrackings.read().then((userTracking) => {
        setUsersTimeTrackingData(userTracking);
      });
    }
  }, [authed, userData, api.users, usersTimeTrackingData]);
  console.log("the data is", usersTimeTrackingData);
  return (
    <div className="App">
      <TimeTrackingScreen />
    </div>
  );
}

export default App;
