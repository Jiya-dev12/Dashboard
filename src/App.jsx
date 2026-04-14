import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaGift,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import Businesses from "./pagess/Businesses.jsx";
import Customer from "./pagess/Customer.jsx";
import Dashboard from "./pagess/Dashboard.jsx";
import Offers from "./pagess/Offers.jsx";
import AI from "./pagess/AI.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 240,
            background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
            color: "#fff",
            height: "100vh",
            padding: "20px",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // pushes logout to bottom
          }}
        >
          <div>
            {/* Logo / Title */}
            <div style={{ marginBottom: "30px", textAlign: "center" }}>
              <img
                src="./src/assets/images/img.png"
                width={60}
                height={60}
                alt="Logo"
              />
              <h5
                style={{ marginTop: "10px", color: "#fff", fontWeight: "bold" }}
              >
                SmartVisit Reward
              </h5>
            </div>

            {/* Menu Heading */}
            <h6
              style={{
                marginBottom: "20px",
                color: "#F4F6F8",
                fontWeight: "bold",
              }}
            >
              MAIN MENU
            </h6>

            {/* Menu Links */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#1E3A5F",
                fontWeight: "500",
              }}
            >
              <FaTachometerAlt /> Dashboard
            </Link>

            <Link
              to="/businesses"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "500",
                backgroundColor: "#1E3A5F",
              }}
            >
              <FaBuilding /> Businesses
            </Link>

            <Link
              to="/customers"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "500",
                backgroundColor: "#1E3A5F",
              }}
            >
              <FaUsers /> Customers
            </Link>

            <Link
              to="/offers"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "500",
                backgroundColor: "#1E3A5F",
              }}
            >
              <FaGift /> Offers & Rewards
            </Link>

            <Link
              to="/analytics"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "500",
                backgroundColor: "#1E3A5F",
              }}
            >
              <FaChartLine /> AI & Analytics
            </Link>
          </div>

          {/* Logout Button */}
          <Link
            to="/logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginTop: "20px",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "500",
              backgroundColor:  "#1E3A5F", // red highlight for logout
            }}
          >
            <FaSignOutAlt /> Logout
          </Link>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#F4F6F8", marginLeft: 240 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/analytics" element={<AI />} />
            {/* You can add a logout route here */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
