import { useEffect, useState } from "react";

import {
    Calendar,
    Ticket,
    Wallet,
    Users
} from "lucide-react";


const API_URL = "http://127.0.0.1:8000/api/events";


// ===============================
// GET EVENTS FROM LARAVEL
// ===============================

export const fetchAdminEvents = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Erreur de chargement des données");
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        return data;
    }

    if (data.data) {
        return data.data;
    }

    if (data.events) {
        return data.events;
    }

    return [];
};


// ===============================
// CALCUL DES STATISTIQUES
// ===============================

export const calculateAdminStats = (events) => {

    // Nombre total des événements
    const totalEvents = events.length;


    // Nombre total des réservations
    const totalReservations = events.reduce(
        (total, event) => {

            const reservations =
                Number(event.reservations_count || 0);

            return total + reservations;
        },
        0
    );


    // Revenus
    const totalRevenue = events.reduce(
        (total, event) => {

            const price = Number(event.price || 0);

            const reservations =
                Number(event.reservations_count || 0);

            return total + price * reservations;
        },
        0
    );


    // Capacité totale
    const totalCapacity = events.reduce(
        (total, event) => {

            const capacity =
                Number(event.capacity || 0);

            return total + capacity;
        },
        0
    );
    return [

        {
            title: "Total Événements",
            value: totalEvents,
            icon: Calendar,
            color: "from-blue-600 to-cyan-500",
            textColor: "text-cyan-400",
            border: "border-cyan-500/20"
        },

        {
            title: "Total Réservations",
            value: totalReservations,
            icon: Ticket,
            color: "from-purple-600 to-pink-500",
            textColor: "text-purple-400",
            border: "border-purple-500/20"
        },

        {
            title: "Revenus Estimés",
            value: `${totalRevenue.toLocaleString()} DH`,
            icon: Wallet,
            color: "from-emerald-600 to-teal-400",
            textColor: "text-emerald-400",
            border: "border-emerald-500/20"
        },

        {
            title: "Capacité Totale",
            value: totalCapacity,
            icon: Users,
            color: "from-amber-500 to-orange-500",
            textColor: "text-amber-400",
            border: "border-amber-500/20"
        }

    ];
};

export const useAdminDashboard = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        const getEvents = async () => {

            try {

                setLoading(true);

                const data = await fetchAdminEvents();

                setEvents(data);

            } catch (error) {

                console.log(error);

                setError(
                    "Impossible de récupérer les statistiques."
                );

            } finally {

                setLoading(false);

            }

        };


        getEvents();

    }, []);


    // Calculer les statistiques
    const stats = calculateAdminStats(events);


    return {
        events,
        stats,
        loading,
        error
    };
};