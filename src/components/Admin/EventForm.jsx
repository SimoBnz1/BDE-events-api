import React from "react";

export const EventForm = ({
  selectedId,
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="rounded-xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Modifier l'événement <span className="text-indigo-400">#{selectedId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mettez à jour les informations de l'événement ci-dessous.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-400 hover:text-white text-xs font-medium px-2.5 py-1 rounded-md hover:bg-slate-800 transition-colors"
        >
          Annuler
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Titre */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Titre de l'événement
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Ex: Tech Conference 2026"
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Catégorie
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="soiree">Soirée</option>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conférence</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="3"
              placeholder="Description détaillée de l'événement..."
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Date de l'événement
            </label>
            <input
              type="date"
              name="date_event"
              value={formData.date_event}
              onChange={onChange}
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Lieu */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Lieu / Localisation
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Ex: Casablanca"
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Prix (DH)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              placeholder="0.00"
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Capacité */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Capacité (Places)
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={onChange}
              placeholder="100"
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};