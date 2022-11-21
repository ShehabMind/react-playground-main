import "./App.css";
import Api, { User } from "@timetac/js-client-library";
import { environment, authCredentials } from "./apiConfig";
import { useEffect, useState } from "react";

function App() {
  const api = new Api(environment);

  const [userData, setUserData] = useState<User>();
  const [usersTimeTrackingData, setUsersTimeTrackingData] = useState<any>();
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
      <header className="App-header">
        <h1>Welcome to TimeTac's react </h1>
      </header>
      <h1>assdsdddsdsdsadddd {userData?.firstname}</h1>
    </div>
  );
}

export default App;
