import { Routes, Route, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaGift,
  FaChartLine,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";
import Businesses from "../pages/Businesses.jsx";
import Customer from "../pages/Customer.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Offers from "./Offers.jsx";
import AI from "./AI.jsx";
import RewardsCards from "./RewardsCards.jsx";

const AdminHome = () => {
  return (
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
          {/* Logo / Title */}
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <img src={logo} width={60} height={60} alt="Logo" />
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
            to="/AdminHome"
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
            to="/AdminHome/businesses"
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
            to="/AdminHome/customers"
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
            to="/AdminHome/RewardsCards"
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
            <FaWallet /> Rewards Cards
          </Link>

          <Link
            to="/AdminHome/offers"
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
            to="/AdminHome/analytics"
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
          to="/"
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
            backgroundColor: "#1E3A5F",
          }}
        >
          <FaSignOutAlt /> Logout
        </Link>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#F4F6F8",
          marginLeft: 240,
        }}
      >
        <Routes>
          <Route index element={<Dashboard />} /> {/* Default Dashboard */}
          <Route path="businesses" element={<Businesses />} />
          <Route path="customers" element={<Customer />} />
          <Route path="rewardscards" element={<RewardsCards />} />
          <Route path="offers" element={<Offers />} />
          <Route path="analytics" element={<AI />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
