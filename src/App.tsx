import "./App.css";
// import { useIsAuthenticated } from "react-auth-kit";
import { createContext, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import api from "./services/api";
import { useIsAuthenticated } from "react-auth-kit";
import Login from "./pages/auth/Login";

export const ApiContext = createContext(api.create("http://localhost:8080"));

function App() {
  const auth = useIsAuthenticated();

  return (
    <>
      <ApiContext.Provider value={api.create("http://localhost:8080")}>
        {auth() ? <Dashboard /> : <Login />}
        <Dashboard />
      </ApiContext.Provider>
      {/* {loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />} */}
    </>
  );
}

export default App;
