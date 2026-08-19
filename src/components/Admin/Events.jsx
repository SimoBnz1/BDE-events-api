import React from "react";
import { useEvents } from "../../services/useEvents";
import { EventForm } from "./EventForm";

export const Events = () => {
  const {
    events,
    selectedId,
    formData,
    handleDelete,
    handleEditClick,
    handleChange,
    handleUpdate,
    resetForm,
  } = useEvents();

  return (
    <div className="p-6 max-w-6xl mx-auto text-slate-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Gestion des Événements
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Gérez la liste des événements, mettez à jour ou supprimez en toute simplicité.
          </p>
        </div>
      </div>

      {/* Tableau Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl mb-10">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase text-xs tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Titre</th>
              <th className="p-4 font-semibold">Catégorie</th>
              <th className="p-4 font-semibold">Prix</th>
              <th className="p-4 font-semibold">Capacité</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-500">
                  Aucun événement trouvé.
                </td>
              </tr>
            ) : (
              events.map((evt) => (
                <tr
                  key={evt.id}
                  className="hover:bg-slate-800/40 transition-colors duration-150"
                >
                  <td className="p-4 font-mono text-slate-400">#{evt.id}</td>
                  <td className="p-4 font-medium text-white">{evt.title}</td>
                  <td className="p-4 text-slate-400 capitalize">{evt.category}</td>
                  <td className="p-4 text-emerald-400 font-semibold">
                    {evt.price} DH
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {evt.capacity} places
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(evt)}
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-150 shadow-sm shadow-indigo-600/30"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-all duration-150"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Formulaire d Modification (Affiche uniquement si un ID est sélectionné) */}
      {selectedId && (
        <EventForm
          selectedId={selectedId}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleUpdate}
          onCancel={resetForm}/>
      )}
    </div>
  );
};