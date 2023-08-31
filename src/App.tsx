import "./App.css";
// import { useIsAuthenticated } from "react-auth-kit";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import { useState } from "react";

function App() {
  // const auth = useIsAuthenticated();

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />}
    </>
  );
}

export default App;
