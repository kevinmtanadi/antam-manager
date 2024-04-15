import "./App.css";
// import { useIsAuthenticated } from "react-auth-kit";
import { createContext } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import api from "./services/api";

export const ApiContext = createContext(
  api.create("https://antam-manager-image-gviplwdfrq-as.a.run.app")
);

function App() {
  const auth = useIsAuthenticated();

  return (
    <>
      <ApiContext.Provider
        value={api.create(
          "https://antam-manager-image-gviplwdfrq-as.a.run.app"
        )}
      >
        {auth() ? <Dashboard /> : <Login />}
        {/* <Dashboard /> */}
      </ApiContext.Provider>
      {/* {loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />} */}
    </>
  );
}

export default App;
