import "./App.css";
import Api, { User } from "@timetac/js-client-library";
import { environment, authCredentials } from "./apiConfig";
import { useEffect, useState, useContext } from "react";
import { TtContextData } from "./context/TimeTrackingContext";
import TimeTrackingView from "./components/TimeTrackings/view";
import { Button } from "@mui/material";
import { LineWave } from "react-loader-spinner";

////
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LineWave
            height="500"
            width="500"
            color="#4fa94d"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor="blue"
            middleLineColor="green"
            lastLineColor="grey"
          />
        </div>
      ) : (
        <>
          <TimeTrackingView />
          <Button
            onClick={() => {
              handleRefresh();
            }}
            style={{
              marginRight: "2%",

              float: "right",
            }}
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
