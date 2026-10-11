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
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

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
  const [activeTab, setActiveTab] = useState("offers");
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const [offerData, setOfferData] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    offer_type: "",
    discount_value: "",
    expiry_date: "",
  });

  const [loadingOffers, setLoadingOffers] = useState(true);

  const [editingOffer, setEditingOffer] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    offer_type: "",
    discount_value: "",
    expiry_date: "",
  });
  // Summary calculations
  const totalOffers = offerData.length;

  const activeOffers = offerData.filter(
    (offer) => offer.approval_status === "approved",
  ).length;

  const totalRedeemed = offerData.reduce((sum, offer) => {
    const num = parseInt(offer.redeemed);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const fetchOffers = async () => {
    try {
      setLoadingOffers(true);

      const { data, error } = await supabase
        .from("offers")
        .select(
          `
        *,
        business:business_id (
          *
        )
      `,
        )
        .order("offer_id", { ascending: true });

      console.log("OFFERS DATA FROM SUPABASE:", data);
      console.log("OFFERS ERROR:", error);

      if (error) {
        console.error("OFFERS FETCH ERROR:", error);
        alert(error.message);
        return;
      }

      const formattedOffers = (data || []).map((offer) => ({
        ...offer,

        type: offer.offer_type || "Offer",

        title: offer.title || "Untitled Offer",

        description: offer.description || "No description",

        // Business ka naam show karne ke liye
        business:
          offer.business?.business_name ||
          offer.business?.name ||
          offer.business?.title ||
          offer.business_id ||
          "Business",

        visits: offer.discount_value
          ? `${offer.discount_value} value`
          : "Offer available",

        expiry: offer.expiry_date
          ? `Expires: ${offer.expiry_date}`
          : "No expiry",

        redeemed: "0 times redeemed",

        active: offer.approval_status === "approved",
      }));

      console.log("FORMATTED OFFERS:", formattedOffers);

      setOfferData(formattedOffers);
    } catch (error) {
      console.error("FETCH OFFERS ERROR:", error);
    } finally {
      setLoadingOffers(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleToggle = async (index) => {
    const offer = offerData[index];

    if (!offer?.offer_id) {
      console.error("Offer ID not found:", offer);
      return;
    }

    // Current status check
    const newStatus =
      offer.approval_status === "approved" ? "pending" : "approved";

    console.log("=================================");
    console.log("OFFER ID:", offer.offer_id);
    console.log("OLD STATUS:", offer.approval_status);
    console.log("NEW STATUS:", newStatus);
    console.log("=================================");

    try {
      const { data, error } = await supabase
        .from("offers")
        .update({
          approval_status: newStatus,
        })
        .eq("offer_id", offer.offer_id)
        .select();

      console.log("UPDATE DATA:", data);
      console.log("UPDATE ERROR:", error);

      if (error) {
        console.error("SUPABASE UPDATE ERROR:", error);
        alert("Approval update failed: " + error.message);
        return;
      }

      if (!data || data.length === 0) {
        console.error("No offer was updated.");
        alert("Offer update nahi hui. Supabase RLS policy check karein.");
        return;
      }

      // UI update
      setOfferData((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                approval_status: newStatus,
                active: newStatus === "approved",
              }
            : item,
        ),
      );

      console.log(
        `Offer ${offer.offer_id} status successfully changed to ${newStatus}`,
      );
    } catch (error) {
      console.error("TOGGLE ERROR:", error);
      alert(error.message || "Failed to update offer");
    }
  };

  // =========================
  // EDIT OFFER
  // =========================

  const handleEdit = (offer) => {
    console.log("EDIT OFFER:", offer);

    setEditingOffer(offer);

    setEditForm({
      title: offer.title || "",
      description: offer.description || "",
      offer_type: offer.offer_type || "",
      discount_value: offer.discount_value || "",
      expiry_date: offer.expiry_date ? offer.expiry_date.split("T")[0] : "",
    });
  };

  // =========================
  // UPDATE OFFER
  // =========================

  const handleUpdateOffer = async () => {
    if (!editingOffer?.offer_id) {
      alert("Offer ID not found");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("offers")
        .update({
          title: editForm.title,
          description: editForm.description,
          offer_type: editForm.offer_type,
          discount_value: editForm.discount_value,
          expiry_date: editForm.expiry_date || null,
        })
        .eq("offer_id", editingOffer.offer_id)
        .select();

      console.log("UPDATED OFFER:", data);
      console.log("UPDATE ERROR:", error);

      if (error) {
        console.error("UPDATE OFFER ERROR:", error);
        alert(error.message);
        return;
      }

      alert("Offer updated successfully!");

      setEditingOffer(null);

      // Fresh data Supabase se lao
      fetchOffers();
    } catch (error) {
      console.error("UPDATE OFFER ERROR:", error);
      alert(error.message || "Failed to update offer");
    }
  };

  // =========================
  // DELETE OFFER
  // =========================

  const handleDelete = async (offer) => {
    if (!offer?.offer_id) {
      alert("Offer ID not found");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${offer.title}"?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      console.log("DELETING OFFER ID:", offer.offer_id);

      const { data, error } = await supabase
        .from("offers")
        .delete()
        .eq("offer_id", offer.offer_id)
        .select("offer_id");

      console.log("DELETE DATA:", data);
      console.log("DELETE ERROR:", error);

      if (error) {
        console.error("DELETE OFFER ERROR:", error);
        alert(error.message);
        return;
      }

      if (!data || data.length === 0) {
        alert("Offer delete nahi hua. Supabase RLS policy check karein.");
        return;
      }

      // Screen se bhi remove
      setOfferData((prev) =>
        prev.filter((item) => item.offer_id !== offer.offer_id),
      );

      alert("Offer deleted successfully!");
    } catch (error) {
      console.error("DELETE OFFER ERROR:", error);
      alert(error.message || "Failed to delete offer");
    }
  };

  const handleSaveOffer = async () => {
    if (
      !newOffer.title.trim() ||
      !newOffer.description.trim() ||
      !newOffer.offer_type ||
      !newOffer.discount_value ||
      !newOffer.expiry_date
    ) {
      alert("Please fill in all offer fields.");
      return;
    }

    const { data, error } = await supabase
      .from("offers")
      .insert([
        {
          title: newOffer.title.trim(),
          description: newOffer.description.trim(),
          offer_type: newOffer.offer_type,
          discount_value: Number(newOffer.discount_value),
          expiry_date: newOffer.expiry_date,
          approval_status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("CREATE OFFER ERROR:", error);
      alert("Offer save nahi hua: " + error.message);
      return;
    }

    await fetchOffers();

    setNewOffer({
      title: "",
      description: "",
      offer_type: "",
      discount_value: "",
      expiry_date: "",
    });

    setShowOfferModal(false);
    alert("Offer created successfully!");
  };
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";

    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return dateValue;
    }

    // Convert DD/MM/YYYY to YYYY-MM-DD
    const match = dateValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (match) {
      return `${match[3]}-${match[2]}-${match[1]}`;
    }

    return "";
  };
  <input
    type="date"
    value={newOffer.expiry_date}
    onChange={(e) =>
      setNewOffer({
        ...newOffer,
        expiry_date: e.target.value,
      })
    }
  />;

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

              {/* Create Offer Modal */}
              {showOfferModal && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "30px",
                      borderRadius: "12px",
                      width: "600px",
                      maxWidth: "100%",
                      maxHeight: "90vh",
                      overflowY: "auto",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      position: "relative",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Close */}
                    <span
                      onClick={() => setShowOfferModal(false)}
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "20px",
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#777",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </span>

                    <h2
                      style={{
                        color: "#1E3A5F",
                        fontSize: "36px",
                        fontWeight: "400",
                        margin: "0 0 25px",
                      }}
                    >
                      Create Offer
                    </h2>

                    {/* Offer Title */}
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Offer Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Weekend Food Deal"
                      value={offerData.title || ""}
                      onChange={(e) =>
                        setOfferData({ ...offerData, title: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "14px 12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box",
                      }}
                    />

                    {/* Description */}
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your offer"
                      value={offerData.description || ""}
                      onChange={(e) =>
                        setOfferData({
                          ...offerData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "14px 12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                    />

                    {/* Offer Type */}
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Offer Type
                    </label>
                    <select
                      value={offerData.type || ""}
                      onChange={(e) =>
                        setOfferData({ ...offerData, type: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "14px 12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Discount">Discount</option>
                      <option value="Free Item">Free Item</option>
                      <option value="Bogo">Bogo</option>
                    </select>

                    {/* Discount Value */}
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Discount Value
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 20"
                      value={offerData.discount_value || ""}
                      onChange={(e) =>
                        setOfferData({
                          ...offerData,
                          discount_value: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "14px 12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box",
                      }}
                    />

                    {/* Expiry Date */}
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={offerData.expiry_date || ""}
                      onChange={(e) =>
                        setOfferData({
                          ...offerData,
                          expiry_date: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "14px 12px",
                        marginBottom: "25px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box",
                      }}
                    />

                    {/* Buttons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={() => setShowOfferModal(false)}
                        style={{
                          padding: "12px 22px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                          background: "#fff",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSaveOffer}
                        style={{
                          padding: "12px 25px",
                          borderRadius: "8px",
                          border: "none",
                          background:
                            "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                          color: "#fff",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "16px",
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

          {/* =========================
    EDIT OFFER MODAL
========================= */}

          {editingOffer && (
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
                zIndex: 2000,
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "500px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                {/* Close */}
                <span
                  onClick={() => setEditingOffer(null)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    fontSize: "25px",
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
                    marginBottom: "20px",
                  }}
                >
                  Edit Offer
                </h2>

                {/* Title */}
                <label style={{ fontWeight: "bold" }}>Offer Title</label>

                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      title: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "6px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                />

                {/* Description */}
                <label style={{ fontWeight: "bold" }}>Description</label>

                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "6px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />

                {/* Offer Type */}
                <label style={{ fontWeight: "bold" }}>Offer Type</label>

                <select
                  value={editForm.offer_type}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      offer_type: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "6px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="Discount">Discount</option>
                  <option value="Free Item">Free Item</option>
                  <option value="Bogo">Bogo</option>
                </select>

                {/* Discount Value */}
                <label style={{ fontWeight: "bold" }}>Discount Value</label>

                <input
                  type="number"
                  value={editForm.discount_value}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      discount_value: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "6px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                />

                {/* Expiry */}
                <label style={{ fontWeight: "bold" }}>Expiry Date</label>

                <input
                  type="date"
                  value={editForm.expiry_date}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      expiry_date: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "6px",
                    marginBottom: "20px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                />

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => setEditingOffer(null)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdateOffer}
                    style={{
                      background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                      color: "#fff",
                      padding: "10px 25px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

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
                {/* Title */}
                <h3
                  style={{
                    margin: "10px 0 5px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {offer.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "#717070",
                    margin: "0 0 15px",
                    fontSize: "14px",
                  }}
                >
                  {offer.description}
                </p>

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
                    onClick={() => handleEdit(offer)}
                    style={{
                      backgroundColor: "#fff",
                      color: "#1E3A5F",
                      padding: "12px 30px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer)}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "10px",
                      cursor: "pointer",
                      color: "red",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrash />
                  </button>
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
                      <h3
                        style={{
                          color: "#1E3A5F",
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
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
