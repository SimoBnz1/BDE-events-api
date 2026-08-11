import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  LayoutDashboard,
  LogIn,
  Menu,
  Search,
  ChevronDown,
  Bell,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
      isActive
        ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
    }`;

  return (
    <div className="bg-[#050816] text-white font-sans antialiased h-screen flex overflow-hidden selection:bg-[#06B6D4] selection:text-[#050816]">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#080d21]/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between shrink-0 relative z-20">
        <div>
          {/* Logo BDE.Events */}
          <div className="h-20 border-b border-white/10 flex items-center px-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(6,182,212,.3)] group-hover:scale-105 transition-transform">
                B
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BDE
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  .Events
                </span>
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">
              Menu Principal
            </div>

            <NavLink to="/" className={getLinkClass}>
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Événements</span>
            </NavLink>

            <NavLink to="/adminDashboard" className={getLinkClass}>
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
              <span>Dashboard Admin</span>
            </NavLink>

            <NavLink to="/login" className={getLinkClass}>
              <LogIn className="w-5 h-5 text-blue-400" />
              <span>Connexion</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer Sidebar / Badge */}
        <div className="p-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <p className="text-xs text-gray-400">Campus 2026 Edition</p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* NAVBAR */}
        <header className="h-20 bg-[#080d21]/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 shrink-0">
          
          {/* Search Bar & Mobile Menu */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button className="text-gray-400 hover:text-white md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-6">
            
            {/* User Info */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Sinan AYDOĞAN
                </div>
                <div className="text-[10px] text-cyan-400/80 font-mono">
                  Étudiant / BDE Member
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] shadow-sm">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center text-cyan-300 font-bold text-xs">
                  SA
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            {/* Notification & Logout */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </button>
              
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </main>

      </div>
    </div>
  );
}