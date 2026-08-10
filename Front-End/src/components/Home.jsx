import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/events";

export const Home = () => {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { key: "all", label: "Tous" },
    { key: "soiree", label: "Soirées" },
    { key: "sport", label: "Sport" },
    { key: "workshop", label: "Workshops" },
    { key: "culture", label: "Culture" },
  ];

  const fetchEvents = async (category = "all") => {
    try {
      setLoading(true);
      setError(null);

      let url = API_URL;
      if (category !== "all") {
        url += `?category=${category}`;
      }

     
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

     
      let eventsData = [];
      if (Array.isArray(data)) {
        eventsData = data;
      } else if (data && Array.isArray(data.data)) {
        eventsData = data.data;
      } else if (data && Array.isArray(data.events)) {
        eventsData = data.events;
      }

      setEvents(eventsData);
    } catch (err) {
      console.error("Fetch error details:", err);
      setError("Impossible de charger les événements.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-[#050816] text-white font-sans antialiased min-h-screen flex flex-col relative selection:bg-[#06B6D4] selection:text-[#050816]">

   
      <div className="fixed inset-0 opacity-30 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-[#050816]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-xl shadow-[0_0_30px_rgba(6,182,212,.25)] group-hover:scale-105 transition-transform">
              B
            </div>

            <span className="font-extrabold text-xl tracking-tight text-white">
              BDE
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                .Events
              </span>
            </span>
          </a>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a
              href="#events"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Événements
            </a>

            <a
              href="#"
              className="hover:text-cyan-400 transition-colors"
            >
              Mes Billets
            </a>

            <a
              href="#"
              className="hover:text-cyan-400 transition-colors"
            >
              À propos
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">

            <a
              href="/admin/events"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Espace Admin
            </a>

            <a
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Connexion
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="relative overflow-hidden border-b border-white/10 py-12">

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute top-1/3 right-1/4 w-[400px] h-[200px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-cyan-300 font-mono mb-6">

            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />

            Plateforme officielle du campus 2026
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Ne rate aucun{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              événement
            </span>{" "}
            de ton BDE.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Réserve ta place en un clic, obtiens ton Pass numérique unique
            et vis l'expérience campus à 100%.
          </p>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main
        id="events"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 relative z-10"
      >

        {/* Header + Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Prochains Événements
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Découvre les activités à venir et réserve tes places
            </p>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-xl text-xs font-medium overflow-x-auto">

            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === category.key
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}

          </div>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-800" />

                <div className="p-6 space-y-4">
                  <div className="h-3 bg-slate-700 rounded w-24" />
                  <div className="h-6 bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-700 rounded w-2/3" />
                </div>
              </div>
            ))}

          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">
              {error}
            </p>

            <button
              onClick={() => fetchEvents(activeCategory)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">
              📅
            </div>

            <h3 className="text-xl font-bold text-white">
              Aucun événement trouvé
            </h3>

            <p className="text-gray-400 mt-2">
              Aucun événement disponible dans cette catégorie.
            </p>
          </div>
        )}

        {/* ================= EVENTS ================= */}
        {!loading && !error && events.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.map((event) => (

              <div
                key={event.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,.25)] transition-all duration-300 flex flex-col group"
              >

                {/* Image */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">

                  <img
                    src={
                      event.image
                        ? event.image
                        : "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={event.title || "Event"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                  {/* Price */}
                  <span className="absolute top-4 right-4 bg-cyan-400 text-[#050816] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {event.price && Number(event.price) > 0
                      ? `${event.price} DH`
                      : "Gratuit"}
                  </span>

                  {/* Places */}
                  {event.capacity &&
                    event.reservations_count >= event.capacity - 10 &&
                    event.reservations_count < event.capacity && (
                      <span className="absolute bottom-4 left-4 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono px-2.5 py-1 rounded-lg backdrop-blur-md animate-pulse">
                         Seulement quelques places !
                      </span>
                    )}

                  {event.capacity &&
                    event.reservations_count >= event.capacity && (
                      <span className="absolute bottom-4 left-4 bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono px-2.5 py-1 rounded-lg backdrop-blur-md">
                        Complet
                      </span>
                    )}

                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">

                  <div>

                    {/* Category */}
                    <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                      {event.category || "Événement"}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {event.description}
                    </p>

                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs text-gray-400 border-t border-white/10 pt-4">

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />

                      <span>
                        {event.date_event
                          ? new Date(event.date_event).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "Date non définie"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />

                      <span>
                        {event.location || "Lieu non défini"}
                      </span>
                    </div>

                  </div>

                  {/* Button */}
                  <a
                    href="/login"
                    className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-sm hover:opacity-90 transition-all shadow-md"
                  >
                    S'inscrire
                  </a>

                </div>
              </div>

            ))}

          </div>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-8 bg-white/[0.02] backdrop-blur-xl text-center text-xs text-gray-400 relative z-10">
        <p>
          © 2026 BDE-Events — Plateforme développée pour le campus.
        </p>
      </footer>

    </div>
  );
};