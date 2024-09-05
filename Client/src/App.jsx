import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Result from "./components/result";

function App() {
  return (
    <>
      <main className=" text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
