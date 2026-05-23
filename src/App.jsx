import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminHome from "./pages/AdminHome";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default Login */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/AdminHome/*" element={<AdminHome />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
