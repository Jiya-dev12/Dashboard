import React from "react";
import svrLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaCoins,
  FaDollarSign,
  FaCreditCard,
  FaBell,
  FaBars,
  FaSearch,
  FaCoffee,
  FaUtensils,
  FaSpa,
  FaDumbbell,
  FaTrash,
  
} from "react-icons/fa";

const RewardsCards = ({ collapsed, setCollapsed }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      <div
             style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               padding: "15px 30px",
               backgroundColor: "#fff",
               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
             }}
           >
             {/* Left side: Bars + Search */}
             <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
               {/* Sidebar toggle (hamburger) */}
               <button
                 onClick={() => setCollapsed(!collapsed)}
                 style={{
                   background: "none",
                   border: "none",
                   cursor: "pointer",
                   color: "#1E3A5F",
                   fontSize: "22px",
                 }}
               >
                 <FaBars />
               </button>
           
               {/* Search bar */}
               <div
                 style={{
                   display: "flex",
                   alignItems: "center",
                   backgroundColor: "#f1f3f4",
                   borderRadius: "20px",
                   padding: "6px 12px",
                   width: "600px",
                   gap: "8px",
                 }}
               >
                 <FaSearch style={{ color: "#555", fontSize: "14px" }} />
                 <input
                   type="text"
                   placeholder="Search..."
                   style={{
                     border: "none",
                     outline: "none",
                     background: "transparent",
                     width: "100%",
                     fontSize: "14px",
                     color: "#555",
                   }}
                 />
               </div>
             </div>
           
             {/* Right side: bell + profile */}
             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
               <div style={{ position: "relative" }}>
                 <FaBell style={{ fontSize: "20px", color: "#1E3A5F" }} />
                 <span
                   style={{
                     position: "absolute",
                     top: "-2px",
                     right: "-2px",
                     width: "8px",
                     height: "8px",
                     backgroundColor: "red",
                     borderRadius: "50%",
                   }}
                 ></span>
               </div>
               <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                 <div
                   style={{
                     width: "32px",
                     height: "32px",
                     borderRadius: "50%",
                     backgroundColor: "#1E3A5F",
                     color: "#fff",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     fontWeight: "bold",
                   }}
                 >
                   A
                 </div>
                 <div style={{ textAlign: "left" }}>
                   <b>Admin</b>
                   <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
                     Super Admin
                   </p>
                 </div>
               </div>
             </div>
           </div>
      {/* Page Title */}
      <div style={{ padding: "30px" }}>
        <h2
          style={{ color: "#0E2A47", marginBottom: "8px", fontWeight: "bold" }}
        >
          Rewards Cards
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          Manage business-generated reward cards and track customer progress.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
          <button
            style={{
              backgroundColor: "#1E3A5F",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Business Cards
          </button>
          <button
            style={{
              backgroundColor: "#E0E7EF",
              color: "#0E2A47",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Customer Cards
          </button>
        </div>

        {/* Search + Generate */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // sab left side par
            alignItems: "center",
            padding: "0 30px",
            marginBottom: "30px",
            gap: "20px",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f3f4",
              padding: "12px 12px",
              width: "100%", // 👈 full width
              maxWidth: "960px", // 👈 same as cards row
              borderRadius: "5px",
            }}
          >
            <FaSearch
              style={{ color: "#555", marginRight: "8px", fontSize: "16px" }}
            />
            <input
              type="text"
              placeholder="Search offers..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontSize: "14px",
                color: "#555",
              }}
            />
          </div>

          {/* Generate Button */}
          <button
            style={{
              backgroundColor: "#1FA2C9",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + Generate Offer
          </button>
        </div>

        {/* Summary Boxes */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          {/* Total Cards */}
          <div
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column", // 👈 vertical arrangement
              justifyContent: "space-between",
            }}
          >
            {/* Row: Icon + Label (Top) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaCreditCard style={{ color: "#1E3A5F", fontSize: "30px" }} />
              <span
                style={{
                  color: "#717070",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Total Offers
              </span>
            </div>

            {/* Number Centered Below */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                4
              </h3>
            </div>
          </div>

          {/* Points Cards */}
          <div
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column", // 👈 vertical arrangement
              justifyContent: "space-between",
            }}
          >
            {/* Row: Icon + Label (Top) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaCoins style={{ color: "#1E3A5F", fontSize: "30px" }} />
              <span
                style={{ color: "#555", fontSize: "18px", fontWeight: "bold" }}
              >
                Points Cards
              </span>
            </div>

            {/* Number Centered Below */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                2
              </h3>
            </div>
          </div>

          {/* Money Cards */}
          <div
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column", // 👈 vertical arrangement
              justifyContent: "space-between",
            }}
          >
            {/* Row: Icon + Label (Top) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaDollarSign style={{ color: "#1E3A5F", fontSize: "30px" }} />
              <span
                style={{ color: "#555", fontSize: "18px", fontWeight: "bold" }}
              >
                Money Cards
              </span>
            </div>

            {/* Number Centered Below */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                2
              </h3>
            </div>
          </div>

          {/* Cards Issued */}

          <div
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column", // 👈 vertical arrangement
              justifyContent: "space-between",
            }}
          >
            {/* Row: Icon + Label (Top) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaGift style={{ color: "#1E3A5F", fontSize: "30px" }} />
              <span
                style={{ color: "#555", fontSize: "18px", fontWeight: "bold" }}
              >
                Cards Issued
              </span>
            </div>

            {/* Number Centered Below */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                316
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* cards */}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#F9FAFB",
          minHeight: "auto",
          padding: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 430px)", // 👈 3 cards per row
          rowGap: "20px",
          columnGap: "0px",
          padding: "0px",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaCoins style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  POINTS CARD
                </h4>
              </div>

              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Coffee Palace
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "3px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 10 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Free Coffee
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              142 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "4px 14px",
                cursor: "pointer",
                //fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaDollarSign style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  MONEY CARD
                </h4>
              </div>
              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Fresh Eats
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 8 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              $15 Cashback
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              87 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "4px 14px",
                cursor: "pointer",

                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* Icon + POINTS CARD in one row */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaCoins style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  POINTS CARD
                </h4>
              </div>

              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  color: "#F5F7FA",
                  fontWeight: "bold",
                }}
              >
                Bella Salon
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 6 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              20% Off Next Visit
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              54 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "4px 14px",
                cursor: "pointer",

                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Card 4 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* Icon + POINTS CARD in one row */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaDollarSign style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  Money CARD
                </h4>
              </div>

              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  color: "#F5F7FA",
                  fontWeight: "bold",
                }}
              >
                The Gym Hub
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 20 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              $50 Discount
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              33 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "6px 14px",
                cursor: "pointer",

                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Card 5 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* Icon + POINTS CARD in one row */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaCoins style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  POINTS CARD
                </h4>
              </div>

              {/* Tea House below */}
              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  color: "#F5F7FA",
                  fontWeight: "bold",
                }}
              >
                Tea House
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 6 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Free Tea
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              80 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "4px 14px",
                cursor: "pointer",

                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Card 6 */}
        <div
          style={{
            width: "410px",
            height: "280px",
            backgroundColor: "#0E2A47", // 👈 light background
            borderRadius: "16px",
            color: "#F5F7FA",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* Icon + POINTS CARD in one row */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaDollarSign style={{ color: "#1FA2C9", fontSize: "16px" }} />
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1FA2C9" }}>
                  Money CARD
                </h4>
              </div>

              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "20px",
                  color: "#F5F7FA",
                  fontWeight: "bold",
                }}
              >
                The Burger World
              </h2>
            </div>
            <img
              src={svrLogo}
              alt="SVR Logo"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </div>

          {/* Reward Info */}
          <div>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#d3d0d0" }}>
              Reward after 7 visits
            </p>
            <h3
              style={{
                margin: "0",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Free Burger
            </h3>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D9D9D9",
                margin: "8px 0",
              }}
            />
          </div>

          {/* Issued + Active */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#d3d0d0" }}>
              130 issued
            </p>
            <button
              style={{
                backgroundColor: "#1FA2C9",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "6px 14px",
                cursor: "pointer",

                fontSize: "13px",
              }}
            >
              Active
            </button>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#E8EDF2",
                color: "#0E2A47",
                border: "none",
                borderRadius: "5px",
                padding: "6px 110px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Deactivate
            </button>
            <FaTrash
              style={{ color: "#1FA2C9", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCards;
