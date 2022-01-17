import Login from "./pages/login/Login";
import DashBoard from "./pages/dashboard/DashBoard";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route
} from "react-router-dom";
import StartSurvey from "./pages/startSurvey/StartSurvey";

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
