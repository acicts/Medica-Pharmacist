import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddMedicine from "./Pages/AddMedicine";
import Dashboard from "./Pages/Dashboard";
import EditMedicine from "./Pages/EditMedicine";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ResetPwd from "./Pages/ResetPwd";
import SendResetPwdEmail from "./Pages/SendPwdResetEmail";
import SendVerificationEmail from "./Pages/SendVerificationEmail";
import Signup from "./Pages/SignUp";
import Verify from "./Pages/Verify";

const App = () => (
  <>
        <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset/reqeust" element={<SendResetPwdEmail />} />
              <Route path="/reset/password/:token" element={<ResetPwd />} />
              <Route path="/verify/request" element={<SendVerificationEmail />} />
              <Route path="/verify/:token" element={<Verify />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/medicine/new" element={<AddMedicine />} />
              <Route path="/medicine/:id" element={<EditMedicine />} />
        </Routes>
  </>
);

export default App;
