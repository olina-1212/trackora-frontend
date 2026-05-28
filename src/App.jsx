import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import AddProblem from "./components/addproblem";
import Applications from "./components/applications";
import Auth from "./components/Auth";

function App() {
  return (
    <Routes>

      {/* LOGIN PAGE (START HERE) */}
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* OTHER PAGES */}
      <Route path="/preparation" element={<AddProblem />} />
      <Route path="/applications" element={<Applications />} />

    </Routes>
  );
}

export default App;