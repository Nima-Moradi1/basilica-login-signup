import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    //we use Routes to navigate through pages with no extra loading
    // kind of like an SPA !..
    <>
      <div className=" h-screen">
        <Toaster />
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
      </div>
    </>
  );
}

export default App;
