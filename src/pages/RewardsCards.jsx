import React, { useEffect, useState } from "react";

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
import { supabase } from "../supabase";

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

  const [editCard, setEditCard] = useState(null);
const [selectedBusinessId, setSelectedBusinessId] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [cardData, setCardData] = useState(null); // ✅ selected card data
  const [editingCardIndex, setEditingCardIndex] = useState(null);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [pictureFile, setPictureFile] = useState(null);
const [picturePreview, setPicturePreview] = useState(null);

const [businesses, setBusinesses] = useState([]);
const [amountData, setAmountData] = useState({
  pointsPerRs: "1",
  minimumSpend: "100",
  rewardThreshold: "500",
  expiryDays: "365",
  rewardType: "% Discount",
});

  const handleSave = async () => {
    if (!editCard) return;

   const updatedCardConfig = {
  ...(editCard.card_config || {}),
  icon: editCard.card_config?.icon || "☕",
  pointsPerRs: editCard.card_config?.pointsPerRs || 1,
  rewardThreshold: editCard.card_config?.rewardThreshold || 500,
  bonusMilestone:
    editCard.card_config?.bonusMilestone ||
    "1000 Points = Free Coffee",
};


const { data, error } = await supabase
  .from("card")
  .update({
    business_id: editCard.business_id,
    minimum_spend: Number(editCard.minimum_spend),
    reward_type: editCard.reward_type,
    bg_color: editCard.bg_color,
    expiry_days: Number(editCard.expiry_days),
    card_config: updatedCardConfig,
  })
  .eq("card_id", editCard.card_id)
  .select(`
    *,
    business:business_id (
      business_id,
      business_name
    )
  `);


    if (error) {
      console.error("Error updating card:", error);
      alert("Card update failed");
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.card_id === editCard.card_id ? data[0] : card,
      ),
    );

    setEditingCardIndex(null);
    setEditCard(null);

    alert("Card updated successfully");
  };

  const handleDelete = async (card) => {
    if (!card?.card_id) {
      alert("Card ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this card?",
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("card")
        .delete()
        .eq("card_id", card.card_id);

      if (error) {
        console.error("Delete error:", error);
        alert("Card delete nahi ho saka.");
        return;
      }

      // Remove card from the screen
      setCards((prevCards) =>
        prevCards.filter((item) => item.card_id !== card.card_id),
      );

      alert("Card deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the card.");
    }
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
  const fetchBusinesses = async () => {
    const { data, error } = await supabase
      .from("business")
      .select("business_id, business_name")
      .order("business_name");

    if (error) {
      console.error("Business fetch error:", error);
      return;
    }

    setBusinesses(data || []);
  };

  fetchBusinesses();
}, []);

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("card")
      .select(
        `
      *,
      business:business_id (
        *
      )
    `,
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("FETCH CARDS ERROR:", error);
      return;
    }

    console.log("CARDS FROM DATABASE:", data);
    console.log("CARDS FROM DATABASE:", data);

    console.log(
      "CARD TYPES:",
      data?.map((card) => ({
        id: card.card_id,
        card_type: card.card_type,
        type: card.type,
        card_category: card.card_category,
      })),
    );

    setCards(data || []);
  };

  // ===== SUMMARY COUNTS =====
  const totalOffers = cards.length;

  const pointCards = cards.filter(
    (card) => card.card_type?.toLowerCase() === "points",
  ).length;

  const amountCards = cards.filter(
    (card) => card.card_type?.toLowerCase() === "amount",
  ).length;

  const filteredCards = cards.filter((card) => {
    const type = String(card.card_type || "")
      .trim()
      .toLowerCase();

    if (filterStatus === "Point Card") {
      return type === "points";
    }

    if (filterStatus === "Amount Card") {
      return type === "amount";
    }

    return true;
  });

  const handleToggle = async (card) => {
    console.log("HANDLE TOGGLE CARD:", card);

    if (!card?.card_id) {
      alert("Card ID not found.");
      return;
    }

    // approved hai to pending, warna approved
    const newApprovalStatus =
      card.approval_status === "approved" ? "pending" : "approved";

    console.log("Card ID:", card.card_id);
    console.log("Old approval_status:", card.approval_status);
    console.log("New approval_status:", newApprovalStatus);

    const { data, error } = await supabase
      .from("card")
      .update({
        approval_status: newApprovalStatus,
      })
      .eq("card_id", card.card_id)
      .select();

    if (error) {
      console.error("Supabase approval status error:", error);
      alert(error.message);
      return;
    }

    console.log("Updated Card:", data);

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.card_id === card.card_id
          ? {
              ...c,
              approval_status: newApprovalStatus,
            }
          : c,
      ),
    );
  };
  


  const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "14px",
  boxSizing: "border-box",
};


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
    {/* Business Name */}
    <label style={{ fontWeight: "bold" }}>Business Name</label>
    <select
      value={selectedBusinessId}
      onChange={(e) => setSelectedBusinessId(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    >
      <option value="">Select Business</option>
      {businesses.map((business) => (
        <option
          key={business.business_id}
          value={business.business_id}
        >
          {business.business_name}
        </option>
      ))}
    </select>

    {/* Spend Setup */}
    <h2 style={{ color: "#0E2A47", fontSize: "22px" }}>
      Spend Setup
    </h2>

    <label style={{ fontWeight: "bold" }}>Points Per Rs</label>
    <input
      type="number"
      min="1"
      value={amountData.pointsPerRs}
      onChange={(e) =>
        setAmountData({
          ...amountData,
          pointsPerRs: e.target.value,
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    />

    <label style={{ fontWeight: "bold" }}>Minimum Spend</label>
    <input
      type="number"
      min="0"
      value={amountData.minimumSpend}
      onChange={(e) =>
        setAmountData({
          ...amountData,
          minimumSpend: e.target.value,
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    />

    <label style={{ fontWeight: "bold" }}>Reward Threshold</label>
    <input
      type="number"
      min="1"
      value={amountData.rewardThreshold}
      onChange={(e) =>
        setAmountData({
          ...amountData,
          rewardThreshold: e.target.value,
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    />

    <label style={{ fontWeight: "bold" }}>Expiry Days</label>
    <input
      type="number"
      min="1"
      value={amountData.expiryDays}
      onChange={(e) =>
        setAmountData({
          ...amountData,
          expiryDays: e.target.value,
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    />

    <label style={{ fontWeight: "bold" }}>Reward Type</label>
    <select
      value={amountData.rewardType}
      onChange={(e) =>
        setAmountData({
          ...amountData,
          rewardType: e.target.value,
        })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    >
      <option value="% Discount">% Discount</option>
      <option value="Cashback">Cashback</option>
      <option value="Free Item">Free Item</option>
    </select>
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
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) return;

                            setLogoFile(file);
                            setLogoPreview(URL.createObjectURL(file));
                          }}
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
                {totalOffers}
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
                {pointCards}
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
                {amountCards}
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
              <h3
                style={{
                  margin: 0,
                  color: "#0E2A47",
                  fontWeight: "bold",
                }}
              >
                {cards.length}
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
            gap: "10px",
            padding: "20px",
            overflowX: "hidden",
            alignItems: "start", // 👈 YE IMPORTANT HAI
          }}
        >
          {/* cards 1 */}
          {(filterStatus === "All Cards" || filterStatus === "Point Card") && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "8px",
                backgroundColor: cards[0]?.status,
                backgroundColor:
                  cards[0]?.approval_status === "approved"
                    ? cards[0]?.bg_color || "#0E2A47"
                    : "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                height: "auto",
                overflow: "visible",
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
                

                  {/* Round Logo / Stamp Icon */}
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
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {cards[0]?.card_config?.icon || "☕"}
                  </div>

                  {/* Info */}
                  <div>
                    <b style={{ color: "#fff", fontSize: "16px" }}>
                      {cards[0]?.business?.business_name || "Business Name"}
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
                          backgroundColor:
                            cards[0]?.approval_status === "approved"
                              ? "#1FA2C9"
                              : "#ccc",

                          color:
                            cards[0]?.approval_status === "approved"
                              ? "#0E2A47"
                              : "#555",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                        }}
                      >
                        {cards[0]?.reward_type || "Free Item"}
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
                    checked={cards[0]?.approval_status === "approved"}
                    onChange={() => handleToggle(cards[0])}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0,
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor:
                        cards[0]?.approval_status === "approved"
                          ? "#1FA2C9"
                          : "#aaa",
                      borderRadius: "20px",
                      transition: "0.4s",
                    }}
                  ></span>

                  <span
                    style={{
                      position: "absolute",
                      height: "16px",
                      width: "16px",
                      left:
                        cards[0]?.approval_status === "approved"
                          ? "22px"
                          : "2px",
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
                {cards[0]?.card_config?.rewardDescription ||
                  "Collect 10 stamps → Get a Free Specialty Latte!"}
              </p>

              {/* Point Card Progress */}
              <div
                style={{
                  marginTop: "20px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  borderRadius: "12px",
                  padding: "7px",
                }}
              >
                {/* Progress Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ Progress
                  </span>

                  <span
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    0 / {cards[0]?.card_config?.totalStamps || 10} pts
                  </span>
                </div>

                {/* Stamp Circles */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "10px",
                    justifyItems: "center",
                  }}
                >
                  {Array.from({
                    length: cards[0]?.card_config?.totalStamps || 10,
                  }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "2px dashed #fff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "16px",
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <hr
                  style={{
                    margin: "20px 0",
                    border: "none",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                  }}
                />

                {/* Visits Required */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Visits required
                  </span>

                  <span
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {cards[0]?.card_config?.totalStamps || 10}
                  </span>
                </div>
              </div>

              {/* Divider Line under Available Balance */}
              <hr style={{ margin: "15px 0", border: "1px solid #777" }} />

              {/* Card Details */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Stamps per visit</span>

                <span>{cards[0]?.stamps_per_visit || 1}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <span>Minimum spend</span>

                <span>Rs.{cards[0]?.minimum_spend || 0}</span>
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
                      Expires after {cards[0]?.expiry_days || 0} days
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
                      onClick={() => {
                        setEditingCardIndex(0);
                        setEditCard(cards[0]);
                      }} // ✅ index set karo
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
                      onClick={() => handleDelete(cards[0])}
                    >
                      <FaTrash style={{ color: "#fff" }} />
                    </div>
                  </div>
                  {editingCardIndex === 0 &&
                    editCard && ( // ✅ Amount Card ka index
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
                          <h3
                            style={{ marginBottom: "20px", color: "#0E2A47" }}
                          >
                            Edit Point Card
                          </h3>

<label>Business Name</label>

<select
  value={editCard?.business_id || ""}
  onChange={(e) => {
    const selectedBusiness = businesses.find(
      (b) => b.business_id === e.target.value
    );

    setEditCard((prev) => ({
      ...prev,
      business_id: e.target.value,
      business: selectedBusiness || null,
    }));
  }}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  }}
>
  <option value="">Select Business</option>

  {businesses.map((business) => (
    <option
      key={business.business_id}
      value={business.business_id}
    >
      {business.business_name}
    </option>
  ))}
</select>


                          <label>Total Stamps</label>

                          <input
                            type="number"
                            value={editCard?.card_config?.totalStamps || 10}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                card_config: {
                                  ...(editCard?.card_config || {}),
                                  totalStamps: Number(e.target.value),
                                },
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginBottom: "12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          />

                          <label>Stamps Per Visit</label>

                          <input
                            type="number"
                            value={editCard?.stamps_per_visit || 1}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                stamps_per_visit: Number(e.target.value),
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginBottom: "12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          />

                          <label>Minimum Spend</label>

                          <input
                            type="number"
                            value={editCard?.minimum_spend || 0}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                minimum_spend: Number(e.target.value),
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginBottom: "12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          />

                          <label>Expiry Days</label>

                          <input
                            type="number"
                            value={editCard?.expiry_days || 180}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                expiry_days: Number(e.target.value),
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginBottom: "12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          />

                          <label>Reward Type</label>

                          <select
                            value={editCard?.reward_type || "Free Item"}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                reward_type: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "8px",
                              marginBottom: "12px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <option value="Free Item">Free Item</option>
                            <option value="% Discount">% Discount</option>
                            <option value="Fixed Off">Fixed Off</option>
                            <option value="Custom">Custom</option>
                          </select>

                          <label>Reward Description</label>

                          <textarea
                            value={
                              editCard?.card_config?.rewardDescription ||
                              "Collect 10 stamps and get a Free Speciality Latte on your next visit."
                            }
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                card_config: {
                                  ...(editCard?.card_config || {}),
                                  rewardDescription: e.target.value,
                                },
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "10px",
                              marginBottom: "20px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              minHeight: "90px",
                            }}
                          />

                          <label>Business Logo / Stamp Icon</label>

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                              marginBottom: "20px",
                            }}
                          >
                            {[
                              "☕",
                              "🛍️",
                              "🍔",
                              "👕",
                              "💊",
                              "🍕",
                              "💇",
                              "🏋️",
                            ].map((icon) => (
                              <button
                                key={icon}
                                type="button"
                                onClick={() =>
                                  setEditCard({
                                    ...editCard,
                                    card_config: {
                                      ...(editCard?.card_config || {}),
                                      icon,
                                    },
                                  })
                                }
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "8px",
                                  border:
                                    editCard?.card_config?.icon === icon
                                      ? "2px solid #4F46E5"
                                      : "1px solid #ccc",
                                  background: "#F7F8FB",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                              >
                                {icon}
                              </button>
                            ))}
                          </div>

                          <label>Card Primary Color</label>

                          <input
                            type="color"
                            value={editCard?.bg_color || "#2563EB"}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                bg_color: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              height: "45px",
                              marginBottom: "20px",
                              cursor: "pointer",
                            }}
                          />

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
                                <FaImage />{" "}
                                {/* ✅ Image icon inside round border */}
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
                                <FaRegImage />{" "}
                                {/* ✅ Picture icon inside box */}
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

                          {/* Buttons */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setEditingCardIndex(null);
                                setEditCard(null);
                              }}
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
                              onClick={handleSave}
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
{/* ================= AMOUNT CARD ================= */}
{(filterStatus === "All Cards" || filterStatus === "Amount Card") && (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "8px",
      backgroundColor:
        cards[1]?.approval_status === "approved"
          ? cards[1]?.bg_color || "#0E2A47"
          : "#555",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "900px",
      overflow: "visible",
      color: "#fff",
    }}
  >
    {/* ================= HEADER ================= */}
    <div
      style={{
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
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

    {/* ================= DIVIDER ================= */}
    <hr
      style={{
        margin: "0 0 15px 0",
        border: "1px solid #777",
        width: "calc(100% + 40px)",
        marginLeft: "-20px",
      }}
    />

    {/* ================= BUSINESS INFO ================= */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* Logo + Business */}
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {/* Round Logo / Stamp Icon */}
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
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {cards[1]?.card_config?.icon || "☕"}
                  </div>

        {/* Business Name */}
        <div>
          <b
            style={{
              color: "#fff",
              fontSize: "16px",
            }}
          >
            {cards[1]?.business?.business_name ||
              cards[1]?.business?.name ||
              "Business"}
          </b>

          {/* Cashback Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                backgroundColor:
                  cards[1]?.approval_status === "approved"
                    ? "#1FA2C9"
                    : "#ccc",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                color:
                  cards[1]?.approval_status === "approved"
                    ? "#0E2A47"
                    : "#555",
              }}
            >
              {cards[1]?.reward_type || "Cashback"}
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
          checked={cards[1]?.approval_status === "approved"}
          onChange={() => handleToggle(cards[1])}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />

        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              cards[1]?.approval_status === "approved"
                ? "#1FA2C9"
                : "#aaa",
            borderRadius: "20px",
            transition: "0.4s",
          }}
        />

        <span
          style={{
            position: "absolute",
            height: "16px",
            width: "16px",
            left:
              cards[1]?.approval_status === "approved"
                ? "22px"
                : "2px",
            bottom: "2px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            transition: "0.4s",
          }}
        />
      </label>
    </div>

    {/* ================= OFFER DESCRIPTION ================= */}
    <p
      style={{
        marginTop: "12px",
        color: "#fff",
        fontWeight: "bold",
        marginBottom: "0",
      }}
    >
      {cards[1]?.card_config?.rewardDescription ||
        `${
          cards[1]?.reward_type || "Cashback"
        } on orders above Rs ${
          cards[1]?.minimum_spend || 0
        }`}
    </p>

    {/* ================= AMOUNT DETAILS BOX ================= */}
   <div
  style={{
    border: "1px solid rgba(255,255,255,0.6)",
    borderRadius: "14px",
    padding: "18px 14px",
    marginTop: "28px",
  }}
>
  <div
    style={{
      fontSize: "17px",
      fontWeight: "700",
      marginBottom: "8px",
    }}
  >
    Total Points
  </div>

  <div
    style={{
      fontSize: "36px",
      fontWeight: "800",
      marginBottom: "12px",
    }}
  >
    0 pts
  </div>

  <div
    style={{
      width: "100%",
      height: "12px",
      background: "rgba(255,255,255,0.3)",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "10px",
    }}
  >
    <div
      style={{
        width: "0%",
        height: "100%",
        background: "#6cc7ff",
        borderRadius: "10px",
      }}
    />
  </div>

  <div
    style={{
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "6px",
    }}
  >
    0 / 500 pts
  </div>

  {/* <div
    style={{
      fontSize: "15px",
      fontWeight: "600",
    }}
  >
    Earn 1 point per Rs spent
  </div>
   */}


</div>

    {/* ================= MINIMUM SPEND ================= */}
    <hr
      style={{
        margin: "15px 0",
        border: "1px solid #777",
      }}
    />

{/* Points Per Rs */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  }}
>
  <span>Points per Rs</span>

  <span>
    {cards[1]?.card_config?.pointsPerRs || 1} point
  </span>
</div>


    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      <span>Minimum spend</span>

      <span>
        Rs.{cards[1]?.minimum_spend || 0}
      </span>
    </div> 

    {/* ================= EXPIRY + ACTIONS ================= */}
    <hr
      style={{
        margin: "15px 0",
        border: "1px solid #777",
      }}
    />

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Expiry */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaCalendarAlt
          style={{
            color: "#fff",
            fontSize: "14px",
          }}
        />

        <span
          style={{
            fontSize: "13px",
            color: "#fff",
          }}
        >
          Expires after {cards[1]?.expiry_days || 0} days
        </span>
      </div>

      {/* Edit + Delete */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        {/* Edit */}
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
       
onClick={() => {
  setEditingCardIndex(1);
  setEditCard({
    ...cards[1],
    card_config: cards[1]?.card_config || {},
  });
}}

>
          <FaPencil style={{ color: "#fff" }} />
        </div>

       


{/* ================= AMOUNT CARD EDIT ================= */}

{editingCardIndex === 1 && editCard && (
  <div
    style={{
      position: "fixed",
      inset: 0,
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
        maxWidth: "95vw",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        color: "#111827",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#0E2A47",
        }}
      >
        Edit Amount Card
      </h3>


      {/* Amount Card Fields */}

<label>Business Name</label>

<select
  value={editCard?.business_id || ""}
  onChange={(e) => {
    const selectedBusiness = businesses.find(
      (b) => b.business_id === e.target.value
    );

    setEditCard((prev) => ({
      ...prev,
      business_id: e.target.value,
      business: selectedBusiness || null,
    }));
  }}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  }}
>
  <option value="">Select Business</option>

  {businesses.map((business) => (
    <option
      key={business.business_id}
      value={business.business_id}
    >
      {business.business_name}
    </option>
  ))}
</select>


      <h4 style={{ color: "#0E2A47", marginBottom: "12px" }}>
        Spend Setup
      </h4>

      <label>Points Per Rs</label>
      <input
        type="number"
        value={editCard.card_config?.pointsPerRs ?? 1}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            card_config: {
              ...(editCard.card_config || {}),
              pointsPerRs: Number(e.target.value),
            },
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <label>Minimum Spend</label>
      <input
        type="number"
        value={editCard.minimum_spend ?? 0}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            minimum_spend: Number(e.target.value),
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <label>Reward Threshold</label>
      <input
        type="number"
        value={editCard.card_config?.rewardThreshold ?? 500}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            card_config: {
              ...(editCard.card_config || {}),
              rewardThreshold: Number(e.target.value),
            },
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <label>Expiry Days</label>
      <input
        type="number"
        value={editCard.expiry_days ?? 365}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            expiry_days: Number(e.target.value),
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {/* Reward Type */}
      <label>Reward Type</label>
      <select
        value={editCard.reward_type || "% Discount"}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            reward_type: e.target.value,
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
        <option value="Cashback">Cashback</option>
        <option value="% Discount">% Discount</option>
        <option value="Fixed Off">Fixed Off</option>
        <option value="Custom">Custom</option>
      </select>

      <label>Reward Description</label>
      <textarea
        value={editCard.card_config?.rewardDescription || ""}
        onChange={(e) =>
          setEditCard({
            ...editCard,
            card_config: {
              ...(editCard.card_config || {}),
              rewardDescription: e.target.value,
            },
          })
          
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          minHeight: "80px",
        }}
      />
 {/* Card Primary Color */}
     

      {/* Business Logo / Icon */}
      <label>Business Logo / Stamp Icon</label>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          margin: "10px 0 20px",
        }}
      >
        {["☕", "🛍️", "🍔", "👕", "💊", "🍕", "💇", "🏋️"].map(
          (icon) => (
            <button
              key={icon}
              type="button"
              onClick={() =>
                setEditCard({
                  ...editCard,
                  card_config: {
                    ...(editCard.card_config || {}),
                    icon,
                  },
                })
                
              }
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "8px",
                border:
                  editCard.card_config?.icon === icon
                    ? "2px solid #2563EB"
                    : "1px solid #ccc",
                background: "#F7F8FB",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              {icon}
            </button>
          )
        )}
      </div>

 {/* Card Primary Color */}
 <label>Card Primary Color</label>

                          <input
                            type="color"
                            value={editCard?.bg_color || "#2563EB"}
                            onChange={(e) =>
                              setEditCard({
                                ...editCard,
                                bg_color: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              height: "45px",
                              marginBottom: "20px",
                              cursor: "pointer",
                            }}
                          />

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
                                <FaImage />{" "}
                                {/* ✅ Image icon inside round border */}
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
                                <FaRegImage />{" "}
                                {/* ✅ Picture icon inside box */}
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

      {/* Buttons */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setEditingCardIndex(null);
                                setEditCard(null);
                              }}
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
                              onClick={handleSave}
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


        {/* Delete */}
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
          onClick={() => handleDelete(cards[1])}
        >
          <FaTrash style={{ color: "#fff" }} />
        </div>
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
