import React from "react";

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 border ${
              isSelected
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
