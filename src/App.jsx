import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import AddProblem from "./components/addproblem";
import Applications from "./components/applications";
import Auth from "./components/Auth";

function App() {

  return (

    <Routes>

      {/* HOME / DASHBOARD */}

      <Route
        path="/"
        element={<Dashboard />}
      />

      {/* PREPARATION PAGE */}

      <Route
        path="/preparation"
        element={<AddProblem />}
      />

      {/* APPLICATIONS PAGE */}

      <Route
        path="/applications"
        element={<Applications />}
      />

      <Route
        path="/auth"
        element={<Auth />}
      />


    </Routes>

  );

}

export default App;