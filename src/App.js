import Login from "./components/pages/login/Login";
import DashBoard from "./components/pages/dashboard/DashBoard";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route
} from "react-router-dom";
import StartSurvey from "./components/pages/startSurvey/StartSurvey";

function App() {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/" element={<StartSurvey/>} />
      </BrowserRoutes>
    </BrowserRouter>


  );
}

export default App;
