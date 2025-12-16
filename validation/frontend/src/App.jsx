import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Seasons from "./pages/Seasons";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/seasons"
        element={
          <ProtectedRoute>
            <Seasons />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
