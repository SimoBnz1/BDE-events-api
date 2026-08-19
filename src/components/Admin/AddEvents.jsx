import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/events";

export const AddEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date_event, setDateEvent] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("soiree");

  const handleSubmit = (e) => {
  e.preventDefault();

  const eventData = { title, description, date_event, location, price, capacity, category };
  const token = localStorage.getItem("token"); 
  fetch(API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(eventData),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        // Afficher l-erreur f console bash t-3rf ila kayn mshkil d validation
        console.error("Erreur Backend:", data);
        alert(data.message || "Erreur lors de l'ajout");
        return;
      }
      navigate("/events");
    })
    .catch((err) => console.log("Erreur Fetch:", err));
};

  // Shared input style
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginTop: "6px",
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#d1d5db",
  };

  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 style={{ color: "#fff", marginTop: 0, marginBottom: "20px", fontSize: "22px" }}>
          ➕ Ajouter un Événement
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Titre de l'événement</label>
            <input
              type="text"
              required
              placeholder="Ex: Conférence Tech 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              rows="3"
              placeholder="Détails sur l'événement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                required
                value={date_event}
                onChange={(e) => setDateEvent(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="soiree">Soirée</option>
                <option value="sport">Sport</option>
                <option value="culture">Culture</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conférence</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Lieu (Location)</label>
            <input
              type="text"
              required
              placeholder="Ex: Casablanca, Hôtel Kenzi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "24px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Prix (DH)</label>
              <input
                type="number"
                required
                min="0"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Capacité</label>
              <input
                type="number"
                required
                min="1"
                placeholder="100"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              style={{
                padding: "10px 18px",
                background: "transparent",
                border: "1px solid #374151",
                color: "#9ca3af",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Annuler
            </button>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#10b981",
                border: "none",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Ajouter l'événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};