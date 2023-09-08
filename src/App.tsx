import "./App.css";
// import { useIsAuthenticated } from "react-auth-kit";
import { createContext, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import api from "./services/api";

export const mainApiContext = createContext(
  api.create("http://localhost:8080")
);

export const goldApiContext = createContext(
  api.create("https://www.goldapi.io/api")
);

function App() {
  // const auth = useIsAuthenticated();

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Dashboard />
      {/* {loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />} */}
    </>
  );
}

export default App;
