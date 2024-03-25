import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
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
              path="/"
              element={<Home />}></Route>
            <Route
              path="/signup"
              element={<Signup />}></Route>
            <Route
              path="/login"
              element={<Login />}></Route>
            <Route
              path="/adm/*"
              element={<PrivateRoute />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
