import React from "react";
import { TrendingUp, Plus } from "lucide-react";
import { useAdminDashboard } from "../../services/dashAdmin";

export const AdminDash = () => {
    const { events, stats, loading, error } = useAdminDashboard();

    return (
        <div className="space-y-8 text-white">
            {/* Header Admin */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Dashboard Admin
                        </span>
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Aperçu global des performances, inscriptions et événements du BDE.
                    </p>
                </div>

                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-sm text-white hover:opacity-90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] self-start sm:self-auto">
                    <Plus className="w-4 h-4" />
                    Nouveau Événement
                </button>
            </div>

            {/* Grid Cards KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={idx}
                            className={`bg-white/5 backdrop-blur-xl border ${stat.border} rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-2xl font-black text-white mt-2">
                                        {loading ? "..." : stat.value}
                                    </h3>
                                </div>
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shrink-0`}
                                >
                                    <IconComponent className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tableau des Derniers Événements */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-bold text-white">
                            Aperçu des Événements
                        </h2>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                        {events.length} enregistrement(s)
                    </span>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-400 animate-pulse">
                        Chargement des statistiques...
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">{error}</div>
                ) : events.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        Aucun événement trouvé pour le moment.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-white/[0.03] text-xs uppercase text-gray-400 border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6">Titre</th>
                                    <th className="py-4 px-6">Catégorie</th>
                                    <th className="py-4 px-6">Prix</th>
                                    <th className="py-4 px-6">Réservations</th>
                                    <th className="py-4 px-6">Taux de Remplissage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {events.map((evt) => {
                                    const resCount = Number(
                                        evt.reservations_count || evt.reservationsCount || 0
                                    );
                                    const cap = Number(evt.capacity || 1);
                                    const percent = Math.min(
                                        Math.round((resCount / cap) * 100),
                                        100
                                    );

                                    return (
                                        <tr
                                            key={evt.id}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="py-4 px-6 font-semibold text-white">
                                                {evt.title}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium">
                                                    {evt.category || "Général"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {Number(evt.price) > 0 ? `${evt.price} DH` : "Gratuit"}
                                            </td>
                                            <td className="py-4 px-6 font-mono">
                                                {resCount} / {evt.capacity || "∞"}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3 w-36">
                                                    <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-mono text-gray-400">
                                                        {percent}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};