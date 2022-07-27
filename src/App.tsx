import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./SignUp";

const App = () => (
  <>
    <Router>
      <main className="">
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  </>
);

export default App;
