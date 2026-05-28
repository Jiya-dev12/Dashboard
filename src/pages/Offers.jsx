import {
  FaBell,
  FaSearch,
  FaTag,
  FaGift,
  FaTrash,
  FaEdit,
  FaCoffee,
  FaMapMarkerAlt,
  FaClock,
  FaRedo,
  FaBuilding,
  FaQrcode,
  FaBars
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const rewardData = [
  {
    tier: " Starter",
    scope: "All Businesses",
    visits: "After 5 visits",
    reward: "5% Discount",
  },
  {
    tier: "Regular",
    scope: "All Businesses",
    visits: "After 10 visits",
    reward: "10% Discount + Free Item",
  },
  {
    tier: "Loyal",
    scope: "All Businesses",
    visits: "After 20 visits",
    reward: "20% Discount",
  },
  {
    tier: "VIP",
    scope: "All Businesses",
    visits: "After 50 visits",
    reward: "30% Discount + Priority Perks",
  },
];

const OffersRewards = ({ collapsed, setCollapsed }) => {
  const [activeTab, setActiveTab] = useState("offers"); // ✅ default Offers
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerData, setOfferData] = useState([
    {
      type: "Discount",
      title: "10% Off Your Next Visit",
      business: "Coffee Palace",
      visits: "5 visits required",
      expiry: "Expires: Dec 31, 2026",
      redeemed: "142 times redeemed",
      active: true,
    },
    {
      type: "Free Item",
      title: "Free Drink on 10th Visit",
      business: "Coffee Palace",
      visits: "10 visits required",
      expiry: "Expires: No expiry",
      redeemed: "87 times redeemed",
      active: true,
    },

    {
      type: "BOGO",
      title: "Buy 1 Get 1 Meal",
      business: "Fresh Eats",
      visits: "8 visits required",
      expiry: "Expires: Jun 30, 2026",
      redeemed: "54 times redeemed",
      active: false,
    },
    {
      type: "Free Item",
      title: "Free Drink on 10th Visit",
      business: "Coffee Palace",
      visits: "10 visits required",
      expiry: "Expires: No expiry",
      redeemed: "87 times redeemed",
      active: true,
    },

    {
      type: "Discount",
      title: "10% Off Your Next Visit",
      business: "Coffee Palace",
      visits: "5 visits required",
      expiry: "Expires: Dec 31, 2026",
      redeemed: "142 times redeemed",
      active: true,
    },
    {
      type: "Free item",
      title: "1 Month Free Gym Pass",
      business: "The Gym Hub",
      visits: "20 visits required",
      expiry: "Expires: Dec 31, 2026",
      redeemed: "12 times redeemed",
      active: false,
    },
  ]);
  const totalOffers = offerData.length;
  const activeOffers = offerData.filter((o) => o.active).length;
  const totalRedeemed = offerData.reduce((sum, o) => {
    const num = parseInt(o.redeemed);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const handleToggle = (index) => {
    const updatedOffers = [...offerData];
    updatedOffers[index].active = !updatedOffers[index].active;
    setOfferData(updatedOffers);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
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

      {/* Page Heading */}
      <div style={{ padding: "20px", marginTop: "10px" }}>
        <h1
          style={{
            color: "#0E2A47",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "39px",
          }}
        >
          Offers & Rewards
        </h1>
        <p style={{ color: "#717070" }}>
          Create and manage offers, discounts, and reward rules.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "-5px", // ✅ thoda upar heading ke barabar
          marginBottom: "20px",
          padding: "0 20px",
        }}
      >
        <button
          onClick={() => setActiveTab("offers")}
          style={{
            backgroundColor: activeTab === "offers" ? "#1E3A5F" : "#f1f3f4",
            color: activeTab === "offers" ? "#fff" : "#333",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <FaTag /> Offers
        </button>

        <button
          onClick={() => setActiveTab("rewards")}
          style={{
            backgroundColor: activeTab === "rewards" ? "#1E3A5F" : "#f1f3f4",
            color: activeTab === "rewards" ? "#fff" : "#333",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <FaGift /> Rewards Rules
        </button>
      </div>

      {/* Create Offer */}
      {/* Conditional Rendering */}
      {activeTab === "offers" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 30px 0px 0px", // ✅ left padding hata diya
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "12px 12px",
                width: "1050px", // ✅ Offers button ke barabar width
                borderRadius: "5px",
                marginLeft: "25px",
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
            <div>
              {/* Create Offer Button */}
              <button
                style={{
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setShowOfferModal(true)} // ✅ show modal on click
              >
                + Create Offer
              </button>

              {/* Modal */}
              {showOfferModal && (
                <div
                  style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
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
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      position: "relative", // ✅ for cross positioning
                    }}
                  >
                    {/* Cross (×) top-right */}
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#717070",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowOfferModal(false)} // ✅ close modal
                    >
                      ×
                    </span>

                    <h2
                      style={{
                        color: "#1E3A5F",
                        marginBottom: "15px",
                        fontWeight: "bold",
                        fontSize: "25px",
                      }}
                    >
                      Create New Offer
                    </h2>

                    {/* Offer Title */}
                    <label style={{ fontWeight: "bold" }}>Offer Title</label>
                    <input
                      type="text"
                      placeholder="e.g. 10% Off Your Next Visit"
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />

                    {/* Business Dropdown */}
                    <label style={{ fontWeight: "bold" }}>Business</label>
                    <select
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <option>Select business</option>
                      <option>Coffee Palace</option>
                      <option>Fresh Eats</option>
                      <option>The Gym Hub</option>
                      <option>Bella Salon</option>
                    </select>

                    {/* Offer Type + Visits Required Row */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: "bold" }}>Offer Type</label>
                        <select
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <option>Type</option>
                          <option>Discount</option>
                          <option>Free Item</option>
                          <option>Bogo</option>
                        </select>
                      </div>

                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: "bold" }}>
                          Visits Required
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 5"
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                          }}
                        />
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <label style={{ fontWeight: "bold" }}>Expiry Date</label>
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "20px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />

                    {/* Only Create Offer Button */}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        style={{
                          background:
                            "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                          color: "#fff",
                          padding: "10px 185px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        Create Offer
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
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              padding: "0 30px 30px 30px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
                {totalOffers}
              </h3>
              <p style={{ margin: 0, color: "#717070" }}>Total Offers</p>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: 0, color: "green", fontWeight: "bold" }}>
                {activeOffers}
              </h3>
              <p style={{ margin: 0, color: "#717070" }}>Active</p>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: 0, color: "#1E3A5F", fontWeight: "bold" }}>
                {totalRedeemed}
              </h3>
              <p style={{ margin: 0, color: "#717070" }}>Total Redeemed</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              padding: "20px",
              marginTop: "-10px",
            }}
          >
            {offerData.map((offer, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: offer.active ? "#fff" : "#f1f1f1", // ✅ light grey when inactive
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  opacity: offer.active ? 1 : 0.6, // ✅ faded look when inactive
                }}
              >
                {/* Top Row: Type + Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#f1f3f4",
                      color: "#0E2A47",
                      fontWeight: "bold",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {offer.type}
                  </span>

                  {/* Toggle Switch */}
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
                      checked={offer.active}
                      onChange={() => handleToggle(index)} // ✅ toggle handler
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: offer.active ? "#4CAF50" : "#ccc",
                        transition: ".4s",
                        borderRadius: "20px",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        height: "16px",
                        width: "16px",
                        left: offer.active ? "22px" : "2px",
                        bottom: "2px",
                        backgroundColor: "#fff",
                        transition: ".4s",
                        borderRadius: "50%",
                      }}
                    ></span>
                  </label>
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: "10px 0",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {offer.title}
                </h3>

                {/* Business + Icons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    color: "#717070",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaBuilding style={{ color: "#1E3A5F" }} /> {offer.business}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaQrcode style={{ color: "#1E3A5F" }} /> {offer.visits}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> {offer.expiry}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaGift style={{ color: "#1E3A5F" }} /> {offer.redeemed}
                  </div>
                </div>

                <hr style={{ margin: "25px 0", borderColor: "#717070" }} />

                {/* Bottom Row: Edit + Delete */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#fff",
                      color: "#1E3A5F",
                      padding: "12px 120px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      textAlign: "center",
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "8px",
                      cursor: "pointer",
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards rules */}

      {activeTab === "rewards" && (
        <div style={{ marginTop: "20px" }}>
          {/* Heading + Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <p style={{ color: "#717070", margin: 0 }}>
              Define global reward rules applied across all businesses
            </p>
            <div>
              {/* Add Rule Button */}
              <button
                style={{
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setShowModal(true)} // ✅ show modal on click
              >
                + Add Rule
              </button>
              {/* Modal */}
              {showModal && (
                <div
                  style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
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
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      position: "relative", // ✅ for cross positioning
                    }}
                  >
                    {/* Cross (×) top-right */}
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#717070",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal(false)} // ✅ close modal
                    >
                      ×
                    </span>

                    <h2
                      style={{
                        color: "#1E3A5F",
                        marginBottom: "15px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Add Reward Rule
                    </h2>

                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: "bold" }}>Rule Name</label>
                      <select
                        style={{
                          width: "100%",
                          padding: "15px",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                        }}
                      >
                        <option>Type</option>
                        <option>Starter</option>
                        <option>Regular</option>
                        <option>Loyal</option>
                        <option>VIP</option>
                      </select>
                    </div>

                    {/* Visits Threshold */}
                    <label style={{ fontWeight: "bold" }}>
                      Visits Threshold
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 15"
                      style={{
                        width: "100%",
                        padding: "15px",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />

                    {/* Reward Description */}
                    <label style={{ fontWeight: "bold" }}>
                      Reward Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15% discount"
                      style={{
                        width: "100%",
                        padding: "15px",
                        marginBottom: "20px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />

                    {/* Only Add Rule Button */}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        style={{
                          background:
                            "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                          color: "#fff",
                          padding: "10px 196px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      >
                        Add Rule
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reward Rules List */}
          {rewardData.map((reward, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                marginTop: "15px",
                backgroundColor: "#fff",
              }}
            >
              {/* Top Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                {/* Left side: Icon + Bronze + All Businesses */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {/* Gift icon round border */}
                  <div
                    style={{
                      backgroundColor: "#fff",
                      width: "60px", // ✅ thoda bara circle
                      height: "60px", // ✅ thoda bara circle
                      display: "flex",
                      alignItems: "center", // ✅ vertical center
                      justifyContent: "center", // ✅ horizontal center
                      color: "#1E3A5F",
                      fontSize: "32px", // ✅ icon size bara kar diya
                    }}
                  >
                    <FaGift />
                  </div>

                  {/* Text column */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {/* Bronze Starter + All Businesses pill in one row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <h3 style={{ color: "#1E3A5F", margin: 0, fontWeight:"bold",fontSize:"25px" }}>
                        {reward.tier}
                      </h3>

                      <div
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "20px",
                          padding: "4px 12px",
                          fontSize: "14px",
                          color: "#717070",
                        }}
                      >
                        {reward.scope}
                      </div>
                    </div>

                    {/* Visits + Reward line directly under Bronze + pill */}
                    <p style={{ margin: 0, color: "#555", lineHeight: "1.2" }}>
                      {reward.visits} → <strong>{reward.reward}</strong>
                    </p>
                  </div>
                </div>
                {/* Bottom Row: Edit + Delete */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start", // ✅ dono left side par
                    alignItems: "center",
                    gap: "12px", // ✅ proper space between buttons
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: " #fff",
                      color: "#1E3A5F",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      textAlign: "center",
                    }}
                  >
                    <FaEdit /> Edit
                  </button>

                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "10px",
                      cursor: "pointer",
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersRewards;
