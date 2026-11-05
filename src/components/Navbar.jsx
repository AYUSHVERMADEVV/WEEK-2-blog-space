import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PenSquare, Menu, X, Feather } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element in editorial face) */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-stone-900 group whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900 rounded"
        >
          <span className="w-8 h-8 rounded-full bg-stone-900 text-[#FAF9F5] flex items-center justify-center font-serif font-bold text-lg group-hover:bg-blue-700 transition-colors">
            B
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900">
            BlogSpace
          </span>
        </Link>

        {/* Zone 2: 3-4 Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-stone-900 ${
                  isActive ? "text-stone-900 font-semibold" : ""
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all shadow-xs hover:shadow whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write a Story</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                    isActive
                      ? "bg-stone-200/70 text-stone-900 font-semibold"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200">
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <PenSquare className="w-4 h-4" />
              <span>Write a Story</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
