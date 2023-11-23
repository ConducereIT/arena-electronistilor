import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login.view";
import Home from "./views/Home.view";
import Register from "./views/Register.view";
import Quickround from "./views/Quickround.view";
import Scoredisplay from "./views/Scoredisplay.view";
import Ranks from "./views/Ranks.view";
import Mainround from "./views/Mainround.view";
import Admin from "./views/Admin.view";
import AdminQuickround from "./views/AdminQuickround.view";
import AdminAddTeam from "./views/AdminAddTeam.view";
import AdminAddQuestionMainRound from "./views/AdminAddQuestionMainRound.view";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quickround" element={<Quickround />} />
        <Route path="/mainround" element={<Mainround />} />
        <Route path="/scoredisplay" element={<Scoredisplay />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addteam" element={<AdminAddTeam />} />
        <Route
          path="/admin/addquestionmainround"
          element={<AdminAddQuestionMainRound />}
        />
        <Route path="/admin/quickround" element={<AdminQuickround />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
