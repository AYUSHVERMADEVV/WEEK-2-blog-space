import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, PenSquare, Sparkles, Compass, Feather } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import BlogCard from "../components/BlogCard.jsx";

export default function HomePage() {
  const { blogs } = useBlogs();

  // Find featured post (or first post if none marked featured)
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  // Remaining blogs for the latest stories grid
  const recentBlogs = blogs.filter((b) => b.id !== featuredBlog?.id).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500">
            <Feather className="w-3.5 h-3.5 text-blue-700" />
            <span>The Independent Editorial Publication</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-900 leading-[1.08] text-balance">
            Where thoughtful ideas find room to breathe.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-stone-600 font-serif leading-relaxed max-w-2xl mx-auto">
            Essays on architecture, contemplative technology, human craft, and philosophy. A quiet sanctuary for writers and curious readers.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all shadow-xs hover:shadow"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Stories</span>
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-800 bg-stone-200/70 hover:bg-stone-200 rounded-full transition-all"
            >
              <PenSquare className="w-4 h-4" />
              <span>Start Writing</span>
            </Link>
          </div>

          {/* Quiet Trust/Publication Strip */}
          <div className="pt-10 flex items-center justify-center gap-6 sm:gap-12 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 font-serif text-sm">6+</span>
              <span>In-Depth Essays</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 font-serif text-sm">100%</span>
              <span>Client-Side LocalStorage</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 font-serif text-sm">Zero</span>
              <span>Ad Clutter</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Lead Story Section */}
      {featuredBlog && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                Curator's Choice · Lead Story
              </h2>
            </div>
            <Link
              to={`/blog/${featuredBlog.id}`}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>Full Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BlogCard blog={featuredBlog} featured={true} />
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Fresh Off The Press
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Latest Publications
            </h2>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-blue-700 transition-colors"
          >
            <span>Browse Complete Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-stone-500 italic py-8">No additional stories yet.</p>
        )}
      </section>

      {/* Editorial Pull Quote / Platform Vision */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F1EA] border border-stone-200/90 rounded-2xl p-8 sm:p-14 text-center space-y-4">
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-stone-900 leading-snug max-w-3xl mx-auto">
            “The finest writing does not beg for attention through manic pacing; it invites the human mind to settle into quiet, deliberate contemplation.”
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 pt-2">
            The BlogSpace Publishing Manifesto
          </p>
        </div>
      </section>

    </div>
  );
}
