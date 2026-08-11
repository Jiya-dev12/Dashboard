import React, { useState } from "react";
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
  FaMoneyBillWave,
  FaStore,
  FaWallet,
  FaUndo,
  FaBalanceScale,
  FaCalendarAlt,
  FaBuilding,
  FaUpload,
  FaImage,
  FaRegImage,
} from "react-icons/fa";
import { FaPencil, FaStar } from "react-icons/fa6";

const businessCards = [
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
];

const customerCards = [
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
  {
    type: "Amount",
    title: "Brew & Bean Coffee",
    offer: "5% cashback on every order above $20",
  },
  {
    type: "Point",
    title: "Slice House Pizzeria",
    offer: "1 point per visit, 10 points = free pizza",
  },
];

const RewardsCards = ({ collapsed, setCollapsed }) => {
  const [activeTab, setActiveTab] = useState("Business");
  const [filterStatus, setFilterStatus] = useState("All Cards");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [cardType, setCardType] = useState("Point"); // ✅ default card type
  const [isActive, setIsActive] = useState(true); // ✅ toggle state
  const [cardStates, setCardStates] = useState([true, true, true]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cardData, setCardData] = useState(null); // ✅ selected card data
  const [editingCardIndex, setEditingCardIndex] = useState(null);

  // ✅ toggle handler
  const handleToggle = (index) => {
    const newStates = [...cardStates];
    newStates[index] = !newStates[index]; // sirf us card ka state flip hoga
    setCardStates(newStates);
  };

  const cards = [
    {
      type: "Point",
      title: "Slice House Pizzeria",
      offer: "Customers earn 1 point per visit",
    },
    {
      type: "Point",
      title: "Slice House Pizzeria",
      offer: "Customers earn 1 point per visit",
    },
    {
      type: "Point",
      title: "Slice House Pizzeria",
      offer: "Customers earn 1 point per visit",
    },
  ];

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
          style={{
            color: "#0E2A47",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Rewards Cards
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          Manage business-generated reward cards and track customer progress.
        </p>

        {/* Tabs */}
        <div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
            {/* Business Cards Button */}
            <button
              onClick={() => setActiveTab("Business")}
              style={{
                backgroundColor:
                  activeTab === "Business" ? "#1E3A5F" : "#E0E7EF",
                color: activeTab === "Business" ? "#fff" : "#0E2A47",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex", // ✅ flex layout
                alignItems: "center", // ✅ vertical center
                gap: "10px", // ✅ space between icon & text
              }}
            >
              <FaBuilding
                style={{
                  fontSize: "20px",
                  color: activeTab === "Business" ? "#fff" : "#0E2A47",
                }}
              />
              Business Cards
            </button>
          </div>
        </div>

        {/* Search + Generate */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px", // ✅ 30px → 20px
            marginTop: "-10px",
            padding: "0 30px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {/* Search Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "12px 12px",
                width: activeTab === "Business" ? "850px" : "1060px", // ✅ different widths
                marginLeft: "-30px",
              }}
            >
              <FaSearch
                style={{ color: "#555", marginRight: "8px", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder={
                  activeTab === "Business"
                    ? "Search businesses..."
                    : "Search customers..."
                }
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                  fontSize: "16px",
                  color: "#555",
                }}
              />
            </div>
          </div>

          {/* Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              border: "1px solid #ddd",
              padding: "16px 12px",
            }}
          >
            <option>All Cards</option>
            <option>Amount Card</option>
            <option>Point Card</option>
          </select>

          {/* Generate Button → only for Business tab */}
          <div>
            {activeTab === "Business" && (
              <button
                onClick={() => setShowGenerateModal(true)}
                style={{
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + Generate Card
              </button>
            )}

            {/* Modal */}
            {showGenerateModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "500px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    position: "relative",
                  }}
                >
                  {/* Cross Icon */}
                  <span
                    onClick={() => setShowGenerateModal(false)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#717070",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </span>

                  <h2
                    style={{
                      color: "#1E3A5F",
                      marginBottom: "15px",
                      fontWeight: "bold",
                      fontSize: "22px",
                    }}
                  >
                    Generate Reward Card
                  </h2>

                  {/* Business Dropdown */}
                  <label style={{ fontWeight: "bold" }}>Business</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <option>Select business</option>
                    <option>Brew & Bean Coffee</option>
                    <option>Slice House Pizzeria</option>
                  </select>

                  {/* Card Category */}
                  <label style={{ fontWeight: "bold" }}>Card Category</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)} // ✅ switch strategy
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <option value="Amount">Amount Card</option>
                    <option value="Point">Point Card</option>
                  </select>

                  {/* Label / Tag */}
                  <label style={{ fontWeight: "bold" }}>Label / Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Cashback, Discount, Free Item"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />

                  {/* ✅ Conditional Strategy */}
                  {cardType === "Point" ? (
                    <>
                      <label style={{ fontWeight: "bold" }}>
                        Visits Required
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 10"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />

                      <label style={{ fontWeight: "bold" }}>
                        Offer Description
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1 point per visit"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <label style={{ fontWeight: "bold" }}>Earned</label>
                      <input
                        type="number"
                        placeholder="e.g. 15"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />

                      <label style={{ fontWeight: "bold" }}>Redeemed</label>
                      <input
                        type="number"
                        placeholder="e.g. 0"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />

                      <label style={{ fontWeight: "bold" }}>Balance</label>
                      <input
                        type="number"
                        placeholder="e.g. 0"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "16px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </>
                  )}

                  {/* Expiry Date */}
                  <label style={{ fontWeight: "bold" }}>Expiry Date</label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />

                  {/* Background Color Options */}
                  <label style={{ fontWeight: "bold" }}>Background Color</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {[
                      "#0E2A47",
                      "#1FA2C9",
                      "#008080",
                      "#28a745",
                      "#ff9800",
                      "#673ab7",
                      "#fff",
                    ].map((color, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedColor(color)} // ✅ set selected color
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                      ></div>
                    ))}

                    {/* Custom Color Picker */}
                    <input
                      type="color"
                      onChange={(e) => setSelectedColor(e.target.value)} // ✅ business chooses custom color
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    />
                  </div>

                  {/* Logo Section */}
                  <div style={{ marginBottom: "20px" }}>
                    {/* Heading */}
                    <label
                      style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      Logo
                    </label>

                    {/* Container for image + upload button */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {/* Image Placeholder */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "5%",
                          border: "2px solid #ddd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          color: "#777",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <FaImage /> {/* ✅ Image icon inside round border */}
                      </div>

                      {/* Upload Button */}
                      <div
                        style={{
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                          padding: "10px 10px",
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <FaUpload style={{ color: "#1E3A5F" }} />{" "}
                        {/* ✅ Upload icon */}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="logoUpload"
                        />
                        <label
                          htmlFor="logoUpload"
                          style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "#1E3A5F",
                          }}
                        >
                          Upload Logo
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Picture Section */}
                  <div style={{ marginBottom: "20px" }}>
                    {/* Heading */}
                    <label
                      style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      Picture
                    </label>

                    {/* Container for icon + upload button */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {/* Image Placeholder */}
                      <div
                        style={{
                          width: "70px",
                          height: "60px",
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          color: "#777",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <FaRegImage /> {/* ✅ Picture icon inside box */}
                      </div>

                      {/* Upload Button */}
                      <div
                        style={{
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                          padding: "10px 10px",
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <FaUpload style={{ color: "#1E3A5F" }} />{" "}
                        {/* ✅ Upload icon */}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="pictureUpload"
                        />
                        <label
                          htmlFor="pictureUpload"
                          style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "#1E3A5F",
                          }}
                        >
                          Upload Picture
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      style={{
                        background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                        color: "#fff",
                        padding: "9px 167px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Generate Card
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                6
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
                3
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
                Amount Cards
              </span>
            </div>

            {/* Number Centered Below */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                3
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

      {/* Parent Container */}

      {/* Content Area */}
      {activeTab === "Business" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px", // ✅ kam gap
            padding: "20px", // ✅ kam padding
            overflowX: "hidden",
          }}
        >
          {/* cards 1 */}
          {(filterStatus === "All Cards" || filterStatus === "Amount Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "8px",
                backgroundColor: cardStates[0] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaMoneyBillWave style={{ color: "#1FA2C9" }} />
                  AMOUNT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#1E3A5F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    B
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Brew & Bean Coffee
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[0] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[0] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Cashback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[0]}
                    onChange={() => handleToggle(0)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[0] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[0] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                5% cashback on every order above $20
              </p>

              {/* Cashback Details */}

              <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
                {/* Earned */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaWallet style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Earned
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 15
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Total
                  </span>
                </div>

                {/* Redeemed */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaGift style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Redeemed
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 0
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Used
                  </span>
                </div>

                {/* Available Balance */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    Available Balance
                  </span>
                  <p style={{ margin: 0, color: "#fff", fontWeight: "bold" }}>
                    Rs 0
                  </p>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/* Top Row: Expires + Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(4)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>
                  {editingCardIndex === 4 && ( // ✅ Amount Card ka index
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh",
                          overflowY: "auto",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Cashback"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* ✅ Reward Strategy for Amount Card */}
                        <label>Earned</label>
                        <input
                          type="number"
                          defaultValue={15}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Redeemed</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Balance</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry Date */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* Square custom color picker */}
                          <input
                            type="color"
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* cards 2 */}
          {(filterStatus === "All Cards" || filterStatus === "Point Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: cardStates[1] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaCoins style={{ color: "#1FA2C9" }} />
                  POINT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#0E2A47",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    S
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Slice House Pizzeria
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[1] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[1] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Free Item
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[0]}
                    onChange={() => handleToggle(1)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[1] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[1] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                Customers earn 1 point per visit.
              </p>

              {/* Progress Tracker */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: cardStates[1] ? "#0E2A47" : "#555",
                  maxWidth: "350px",
                  maxHeight: "300px",
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Icon + Progress */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaStar style={{ color: "#fff", fontSize: "18px" }} />
                    <span style={{ fontWeight: "bold", color: "#fff" }}>
                      Progress
                    </span>
                  </div>

                  {/* Right Side: Points */}
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    0 / 10 pts
                  </span>
                </div>

                {/* Circles Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)", // ✅ 5 circles per row
                    gap: "12px",
                    justifyItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "2px dashed #fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Divider Line */}
                <hr
                  style={{
                    margin: "0 0 15px 0",
                    border: "1px solid #777",
                    width: "100%",
                  }}
                />

                {/* Footer Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Left Side: Visits Required */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>
                    Visits required
                  </span>

                  {/* Right Side: Total */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>10</span>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/*  Expires  */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(1)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>

                  {editingCardIndex === 1 && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh", // ✅ scroll limit
                          overflowY: "auto", // ✅ scroll enable
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Free Item"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Visits */}
                        <label>Visits Required</label>
                        <input
                          type="number"
                          defaultValue={10}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Offer */}
                        <label>Offer Description</label>
                        <input
                          type="text"
                          defaultValue="1 point per visit"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* ✅ Square custom color picker */}
                          <input
                            type="color"
                            onChange={(e) =>
                              console.log("Custom color:", e.target.value)
                            }
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* cards 3 */}
          {(filterStatus === "All Cards" || filterStatus === "Amount Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: cardStates[2] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaMoneyBillWave style={{ color: "#1FA2C9" }} />
                  AMOUNT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#1E3A5F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    B
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Brew & Bean Coffee
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[2] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[2] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Cashback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[0]}
                    onChange={() => handleToggle(2)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[2] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[2] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                5% cashback on every order above $20
              </p>

              {/* Cashback Details */}

              <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
                {/* Earned */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaWallet style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Earned
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 15
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Total
                  </span>
                </div>

                {/* Redeemed */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaGift style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Redeemed
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 0
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Used
                  </span>
                </div>

                {/* Available Balance */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    Available Balance
                  </span>
                  <p style={{ margin: 0, color: "#fff", fontWeight: "bold" }}>
                    Rs 0
                  </p>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/* Top Row: Expires + Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(5)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>
                  {editingCardIndex === 5 && ( // ✅ Amount Card ka index
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh",
                          overflowY: "auto",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Cashback"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* ✅ Reward Strategy for Amount Card */}
                        <label>Earned</label>
                        <input
                          type="number"
                          defaultValue={15}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Redeemed</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Balance</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry Date */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* Square custom color picker */}
                          <input
                            type="color"
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* cards 4 */}
          {(filterStatus === "All Cards" || filterStatus === "Point Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: cardStates[3] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaCoins style={{ color: "#1FA2C9" }} />
                  POINT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#0E2A47",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    S
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Slice House Pizzeria
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[3] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[3] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Free Item
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[3]}
                    onChange={() => handleToggle(3)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[3] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[3] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                Customers earn 1 point per visit.
              </p>

              {/* Progress Tracker */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: cardStates[3] ? "#0E2A47" : "#555",
                  maxWidth: "350px",
                  maxHeight: "300px",
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Icon + Progress */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaStar style={{ color: "#fff", fontSize: "18px" }} />
                    <span style={{ fontWeight: "bold", color: "#fff" }}>
                      Progress
                    </span>
                  </div>

                  {/* Right Side: Points */}
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    0 / 10 pts
                  </span>
                </div>

                {/* Circles Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)", // ✅ 5 circles per row
                    gap: "12px",
                    justifyItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "2px dashed #fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Divider Line */}
                <hr
                  style={{
                    margin: "0 0 15px 0",
                    border: "1px solid #777",
                    width: "100%",
                  }}
                />

                {/* Footer Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Left Side: Visits Required */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>
                    Visits required
                  </span>

                  {/* Right Side: Total */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>10</span>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/*  Expires  */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(2)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>

                  {editingCardIndex === 2 && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh", // ✅ scroll limit
                          overflowY: "auto", // ✅ scroll enable
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Business */}
                        <label>Business</label>
                        <input
                          type="text"
                          defaultValue="Slice House Pizzeria"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Free Item"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Visits */}
                        <label>Visits Required</label>
                        <input
                          type="number"
                          defaultValue={10}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Offer */}
                        <label>Offer Description</label>
                        <input
                          type="text"
                          defaultValue="1 point per visit"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* ✅ Square custom color picker */}
                          <input
                            type="color"
                            onChange={(e) =>
                              console.log("Custom color:", e.target.value)
                            }
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* cards 5 */}
          {(filterStatus === "All Cards" || filterStatus === "Amount Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: cardStates[4] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaMoneyBillWave style={{ color: "#1FA2C9" }} />
                  AMOUNT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#1E3A5F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    B
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Brew & Bean Coffee
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[4] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[4] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Cashback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[4]}
                    onChange={() => handleToggle(4)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[4] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[4] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                5% cashback on every order above $20
              </p>

              {/* Cashback Details */}

              <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
                {/* Earned */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaWallet style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Earned
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 15
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Total
                  </span>
                </div>

                {/* Redeemed */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaGift style={{ color: "#fff", fontSize: "18px" }} />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      >
                        Redeemed
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Rs 0
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#fff",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    Used
                  </span>
                </div>

                {/* Available Balance */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    Available Balance
                  </span>
                  <p style={{ margin: 0, color: "#fff", fontWeight: "bold" }}>
                    Rs 0
                  </p>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/* Top Row: Expires + Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(6)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>
                  {editingCardIndex === 6 && ( // ✅ Amount Card ka index
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh",
                          overflowY: "auto",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Cashback"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* ✅ Reward Strategy for Amount Card */}
                        <label>Earned</label>
                        <input
                          type="number"
                          defaultValue={15}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Redeemed</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        <label>Balance</label>
                        <input
                          type="number"
                          defaultValue={0}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry Date */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* Square custom color picker */}
                          <input
                            type="color"
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage
                              style={{ color: "#aaa", fontSize: "24px" }}
                            />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* cards 6 */}
          {(filterStatus === "All Cards" || filterStatus === "Point Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: cardStates[5] ? "#0E2A47" : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                maxHeight: "465px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3
                  style={{
                    color: "#1FA2C9",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  <FaCoins style={{ color: "#1FA2C9" }} />
                  POINT CARD
                </h3>
              </div>

              {/* Divider Line under Amount */}
              <hr
                style={{
                  margin: "0 0 15px 0", // ✅ no extra spacing
                  border: "1px solid #777",
                  width: "calc(100% + 40px)", // ✅ expands beyond padding (20px left + 20px right)
                  marginLeft: "-20px", // ✅ shifts line left
                }}
              />

              {/* Content Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Side: Logo + Info */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {/* Round Logo */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#0E2A47",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    S
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      Slice House Pizzeria
                    </b>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      {/* Right Side: Cashback Badge */}
                      <span
                        style={{
                          backgroundColor: cardStates[5] ? "#1FA2C9" : "#ccc", // ✅ ON par blue, OFF par grey
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: cardStates[5] ? "#0E2A47" : "#555", // ✅ ON par dark text, OFF par muted text
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // ✅ smooth transition
                        }}
                      >
                        Free Item
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "40px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cardStates[5]}
                    onChange={() => handleToggle(5)} // ✅ sirf Amount Card toggle
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: cardStates[5] ? "#1FA2C9" : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left: cardStates[5] ? "22px" : "2px",
                      bottom: "2px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.4s",
                    }}
                  ></span>
                </label>
              </div>

              {/* Offer Line */}
              <p
                style={{ marginTop: "12px", color: "#fff", fontWeight: "bold" }}
              >
                Customers earn 1 point per visit.
              </p>

              {/* Progress Tracker */}
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: cardStates[5] ? "#0E2A47" : "#555",
                  maxWidth: "350px",
                  maxHeight: "300px",
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Icon + Progress */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaStar style={{ color: "#fff", fontSize: "18px" }} />
                    <span style={{ fontWeight: "bold", color: "#fff" }}>
                      Progress
                    </span>
                  </div>

                  {/* Right Side: Points */}
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    0 / 10 pts
                  </span>
                </div>

                {/* Circles Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)", // ✅ 5 circles per row
                    gap: "12px",
                    justifyItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "2px dashed #fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Divider Line */}
                <hr
                  style={{
                    margin: "0 0 15px 0",
                    border: "1px solid #777",
                    width: "100%",
                  }}
                />

                {/* Footer Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Left Side: Visits Required */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>
                    Visits required
                  </span>

                  {/* Right Side: Total */}
                  <span style={{ color: "#fff", fontWeight: "bold" }}>10</span>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              <div>
                {/*  Expires  */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Left Side: Expires */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                    <span style={{ fontSize: "13px", color: "#fff" }}>
                      Expires Sep 30, 2026
                    </span>
                  </div>

                  {/* Bottom Row: Edit + Delete Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingCardIndex(3)} // ✅ index set karo
                    >
                      <FaPencil style={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(card)}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>

                  {editingCardIndex === 3 && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px",
                          borderRadius: "12px",
                          width: "450px",
                          maxHeight: "80vh", // ✅ scroll limit
                          overflowY: "auto", // ✅ scroll enable
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <h3 style={{ marginBottom: "20px", color: "#0E2A47" }}>
                          Edit Reward Card
                        </h3>

                        {/* Label */}
                        <label>Label / Tag</label>
                        <input
                          type="text"
                          defaultValue="Free Item"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Visits */}
                        <label>Visits Required</label>
                        <input
                          type="number"
                          defaultValue={10}
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Offer */}
                        <label>Offer Description</label>
                        <input
                          type="text"
                          defaultValue="1 point per visit"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Expiry */}
                        <label>Expiry Date</label>
                        <input
                          type="date"
                          defaultValue="2026-09-30"
                          style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "20px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                          }}
                        />

                        {/* Background Color */}
                        <label>Background Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "darkblue",
                            "teal",
                            "green",
                            "orange",
                            "purple",
                            "white",
                            "black",
                          ].map((color) => (
                            <div
                              key={color}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                            ></div>
                          ))}
                          {/* ✅ Square custom color picker */}
                          <input
                            type="color"
                            onChange={(e) =>
                              console.log("Custom color:", e.target.value)
                            }
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #aaa",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </div>

                        {/* Logo Upload */}
                        <label>Logo</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Logo
                          </button>
                        </div>

                        {/* Picture Upload */}
                        <label>Picture</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5%",
                              border: "2px solid #aaa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaImage style={{ color: "#aaa" }} />
                          </div>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              background: "#f5f5f5",
                              cursor: "pointer",
                            }}
                          >
                            Upload Picture
                          </button>
                        </div>

                        {/* Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => setEditingCardIndex(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#ccc",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(card)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "none",
                              background: "#1FA2C9",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RewardsCards;
