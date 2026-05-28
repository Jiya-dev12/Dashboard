import { NavLink, Route, Routes } from "react-router-dom";

import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaGift,
  FaChartLine,
  FaSignOutAlt,
  FaWallet,
  FaCog,
} from "react-icons/fa";

import logo from "../assets/images/logo.png";
import Businesses from "../pages/Businesses.jsx";
import Customer from "../pages/Customer.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Offers from "./Offers.jsx";
import AI from "./AI.jsx";
import RewardsCards from "./RewardsCards.jsx";
import Settings from "./Settings.jsx";

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? 70 : 240,
          background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
          color: "#fff",
          height: "100vh",
          padding: "20px 10px",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // ✅ top upar, logout neeche
          transition: "width 0.3s ease",
        }}
      >
        <div>
          {/* Logo / Title */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <img src={logo} width={60} height={60} alt="Logo" />
            {!collapsed && (
              <h5
                style={{ marginTop: "10px", color: "#fff", fontWeight: "bold" }}
              >
                SmartVisit Reward
              </h5>
            )}
          </div>

          {/* ✅ Separator line below logo */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginBottom: "20px",
            }}
          ></div>

          {/* Menu Heading */}
          {!collapsed && (
            <h6
              style={{
                marginBottom: "20px",
                color: "#F4F6F8",
                fontWeight: "bold",
              }}
            >
              MAIN MENU
            </h6>
          )}

          {/* Menu Links */}

          <NavLink
            to="/AdminHome"
            end
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginBottom: "15px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaTachometerAlt style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>Dashboard</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/businesses"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginTop: "-5px",
              marginBottom: "15px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaBuilding style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>Businesses</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/customers"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginTop: "-5px",
              marginBottom: "15px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaUsers style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>Customers</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/rewardscards"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginBottom: "15px",
              marginTop: "-5px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaWallet style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>Rewards Cards</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/offers"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginTop: "-5px",
              marginBottom: "15px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaGift style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>
                      Offers & Rewards
                    </span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/analytics"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginBottom: "15px",
              marginTop: "-5px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaChartLine style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>AI & Analytics</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/AdminHome/settings"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              color: "#fff",
              textDecoration: "none",
              marginBottom: "15px",
              marginTop: "-5px",
              fontWeight: "500",
              fontSize: "16px",
              backgroundColor: isActive ? " #1E3A5F" : "transparent", // ✅ black when active
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left side: icon + text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaCog style={{ fontSize: "18px" }} />
                  {!collapsed && (
                    <span style={{ whiteSpace: "nowrap" }}>Settings</span>
                  )}
                </div>

                {/* Right side: arrow only when active */}
                {isActive && !collapsed && (
                  <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                )}
              </>
            )}
          </NavLink>
          </div>

          {/* Separator line above logout */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginTop: "100px",
            }}
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
                backgroundColor: isActive ? "#000" : "transparent",
                padding: "10px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
               
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Left side: icon + text */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FaSignOutAlt style={{ fontSize: "18px" }} />
                    {!collapsed && (
                      <span style={{ whiteSpace: "nowrap" }}>Logout</span>
                    )}
                  </div>

                  {/* Right side: arrow only when active */}
                  {isActive && !collapsed && (
                    <span style={{ fontSize: "14px", color: "#fff" }}>➔</span>
                  )}
                </>
              )}
            </NavLink>
          </div>
        </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#F4F6F8",
          marginLeft: collapsed ? 70 : 240, // ✅ adjust margin
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          <Route
            index
            element={
              <Dashboard collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />
          <Route
            path="businesses"
            element={
              <Businesses collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />

          <Route
            path="customers"
            element={
              <Customer collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />
          <Route
            path="rewardscards"
            element={
              <RewardsCards collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />
          <Route
            path="offers"
            element={
              <Offers collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />
          <Route
            path="analytics"
            element={<AI collapsed={collapsed} setCollapsed={setCollapsed} />}
          />
          <Route
            path="settings"
            element={
              <Settings collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
