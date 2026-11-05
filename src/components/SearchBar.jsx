import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, placeholder = "Search articles by title, author, or keyword..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-900/20 focus:border-stone-900 transition-all shadow-2xs"
        aria-label="Search articles"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
