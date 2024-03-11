import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    //we use Routes to navigate through pages with no extra loading
    // kind of like an SPA !..
    <>
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={<Signup />}></Route>
          <Route
            path="/login"
            element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
