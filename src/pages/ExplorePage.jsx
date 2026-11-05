import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Compass, Filter, SlidersHorizontal, BookX, PenSquare, ArrowUpDown } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import { CATEGORIES } from "../data/sampleBlogs.js";
import BlogCard from "../components/BlogCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

export default function ExplorePage() {
  const { blogs } = useBlogs();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query parameter synchronization
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'reading-time'

  // Update state when search params change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Sync category selection to URL
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((post) => {
        // Category filter
        const matchesCategory =
          selectedCategory === "All" ||
          post.category?.toLowerCase() === selectedCategory.toLowerCase();

        // Search query filter (title, author, category, excerpt, content)
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          post.title?.toLowerCase().includes(q) ||
          post.author?.name?.toLowerCase().includes(q) ||
          post.category?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
        }
        if (sortBy === "oldest") {
          return new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0);
        }
        if (sortBy === "reading-time") {
          const getMinutes = (str) => parseInt(str || "1", 10) || 1;
          return getMinutes(b.readTime) - getMinutes(a.readTime);
        }
        return 0;
      });
  }, [blogs, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
          <Compass className="w-3.5 h-3.5 text-blue-700" />
          <span>The Archive</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Explore All Stories
        </h1>
        <p className="text-stone-600 font-serif text-base max-w-2xl leading-relaxed">
          Search across essays, long-form journals, and technical perspectives. Filter by topic or discover new voices.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="space-y-4 bg-[#FFFFFF] border border-stone-200/80 rounded-xl p-4 sm:p-6 shadow-2xs">
        
        {/* Search input + Sort dropdown row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              placeholder="Search by title, author name, or keyword..."
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-stone-900/15"
              aria-label="Sort articles"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="reading-time">Longest Read</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
          
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing <span className="font-semibold text-stone-900">{filteredBlogs.length}</span>{" "}
          {filteredBlogs.length === 1 ? "article" : "articles"}
          {selectedCategory !== "All" && (
            <> in <span className="font-semibold text-stone-800">{selectedCategory}</span></>
          )}
          {searchQuery && (
            <> matching "<span className="font-semibold text-stone-800">{searchQuery}</span>"</>
          )}
        </span>
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        /* Friendly Empty State */
        <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-10 sm:p-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
            <BookX className="w-7 h-7 stroke-1" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              No matching articles found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              We couldn't find any articles matching your search criteria. Try a different keyword, choose another category, or write one yourself!
            </p>
          </div>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Reset Search & Filters
            </button>
            <Link
              to="/create"
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write a New Story</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
