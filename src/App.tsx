import "./App.css";
import Api, { User } from "@timetac/js-client-library";
import { environment, authCredentials } from "./apiConfig";
import { useEffect, useState, useContext } from "react";
import { TtContextData } from "./context/TimeTrackingContext";
import TimeTrackingView from "./components/TimeTrackings/view";
import { Button } from "@mui/material";
function App() {
  const api = new Api(environment);
  const [usersTimeTrackingData, setUsersTimeTrackingData] =
    useContext(TtContextData);
  const [userData, setUserData] = useState<User>();

  const [authed, setAuthed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleRefresh = () => {
    setIsLoading(true);
    api.timeTrackings.read().then((userTracking) => {
      setUsersTimeTrackingData(userTracking);
      console.log("the data is", usersTimeTrackingData);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    if (!authed) {
      api.authentication.login(authCredentials).then((tokensData) => {
        api.authentication.setTokens(tokensData);
        console.log("token dataaaaaaaaaaaa", tokensData);
        setAuthed(true);
      });
    }
  }, [authed, api.authentication]);

  useEffect(() => {
    if (authed && !userData) {
      setIsLoading(true);
      api.users.readMe().then((Mydata: any) => {
        setUserData(Mydata);
        console.log(Mydata, "------------------");
      });

      api.timeTrackings.read().then((userTracking) => {
        setUsersTimeTrackingData(userTracking);
        console.log("the data is", usersTimeTrackingData);
        setIsLoading(false);
      });
    }

    console.log(userData, "------------------");
    console.log("the auth is", authed);
  }, [
    authed,
    userData,
    api.users,
    api.timeTrackings,
    usersTimeTrackingData,
    setUsersTimeTrackingData,
  ]);

  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <>
          <TimeTrackingView />
          <Button
            onClick={() => {
              handleRefresh();
            }}
            style={{ marginRight: "3%" }}
            variant="contained"
          >
            Refresh
          </Button>
        </>
      )}
    </>
  );
}

export default App;
