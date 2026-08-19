import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000/api/events";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_event: "",
    location: "",
    price: "",
    capacity: "",
    category: "conference",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch Events
  const getEvents = () => {
    fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur Fetch");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Delete Event
  const handleDelete = (id) => {
    if (window.confirm("Bghiti t-supprimer had event?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
        .then(() => getEvents())
        .catch((err) => console.log(err));
    }
  };

  // Edit Click
  const handleEditClick = (evt) => {
    setSelectedId(evt.id);
    setFormData({
      title: evt.title || "",
      description: evt.description || "",
      date_event: evt.date_event ? evt.date_event.slice(0, 10) : "",
      location: evt.location || "",
      price: evt.price || "",
      capacity: evt.capacity || "",
      category: evt.category || "conference",
    });
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update Event
  const handleUpdate = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
    };

    fetch(`${API_URL}/${selectedId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          console.error("Laravel Error:", errData);
          throw new Error("Erreur lors de la modification");
        }
        return res.json();
      })
      .then(() => {
        getEvents();
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setSelectedId(null);
    setFormData({
      title: "",
      description: "",
      date_event: "",
      location: "",
      price: "",
      capacity: "",
      category: "conference",
    });
  };

  return {
    events,
    selectedId,
    formData,
    handleDelete,
    handleEditClick,
    handleChange,
    handleUpdate,
    resetForm,
  };
};