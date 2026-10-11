import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminHome from "./pages/AdminHome";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.home);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={user.id ? <Navigate to="/AdminHome" /> : <Login />} />
        
        {/* Signup */}
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Home */}
        <Route path="/AdminHome/*" element={user.id ? <AdminHome /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
