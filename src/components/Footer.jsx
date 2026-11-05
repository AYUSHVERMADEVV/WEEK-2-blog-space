import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RefreshCw, BookOpen, Heart, ArrowUpRight } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import { CATEGORIES } from "../data/sampleBlogs.js";

export default function Footer() {
  const { resetToSample, blogs } = useBlogs();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/explore?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F4F1EA] border-t border-stone-200 mt-20 text-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-stone-900 group">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-[#FAF9F5] flex items-center justify-center font-serif font-bold text-sm">
                B
              </span>
              <span className="text-xl font-serif font-bold tracking-tight">
                BlogSpace
              </span>
            </Link>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              An open editorial publication crafted for curious minds, technical craftsmen, and reflective writers. Where ideas find room to breathe and depth triumphs over noise.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-500 pt-2">
              <span>{blogs.length} stories currently preserved</span>
              <span>·</span>
              <span>Zero telemetry</span>
              <span>·</span>
              <span>LocalStorage persistent</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Explore Stories
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Write a Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-700 hover:text-stone-950 transition-colors">
                  About BlogSpace
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Curated Topics
            </h4>
            <ul className="space-y-1.5 text-sm">
              {CATEGORIES.filter((c) => c !== "All").slice(0, 5).map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="text-stone-700 hover:text-stone-950 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span>{category}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 border-t border-stone-300/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} BlogSpace Editorial. Built with React, Vite, and modern CSS.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.confirm("Reset blog storage to original 6 sample stories? This will clear custom posts.")) {
                  resetToSample();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 transition-colors"
              title="Reset data to initial sample articles"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
