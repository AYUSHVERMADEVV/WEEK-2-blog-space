import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export default function BlogCard({ blog, featured = false }) {
  const [imgError, setImgError] = useState(false);

  const { id, title, excerpt, category, author, publishedAt, readTime, coverImage } = blog;

  // Format date nicely (e.g. "Oct 18, 2026")
  const formattedDate = (() => {
    try {
      const d = new Date(publishedAt);
      if (isNaN(d.getTime())) return publishedAt;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return publishedAt;
    }
  })();

  if (featured) {
    return (
      <article className="group relative bg-[#FFFFFF] border border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Featured Image */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-stone-100">
            {!imgError && coverImage ? (
              <img
                src={coverImage}
                alt={title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400">
                <BookOpen className="w-12 h-12 mb-2 stroke-1" />
                <span className="text-xs font-serif uppercase tracking-widest">BlogSpace Story</span>
              </div>
            )}
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Unboxed Metadata Header (No pills, clean typography) */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
                <span className="text-blue-700 font-semibold">{category}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{readTime}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Featured Lead</span>
              </div>

              {/* Title */}
              <Link to={`/blog/${id}`} className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900 rounded">
                <h3 className="text-2xl sm:text-3xl lg:text-3xl font-serif font-bold text-stone-900 group-hover:text-blue-800 transition-colors leading-tight">
                  {title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                {excerpt}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`}
                  alt={author?.name || "Author"}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-200"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`;
                  }}
                />
                <div>
                  <div className="text-sm font-semibold text-stone-900">{author?.name}</div>
                  <div className="text-xs text-stone-500">{formattedDate}</div>
                </div>
              </div>

              <Link
                to={`/blog/${id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                aria-label={`Read article: ${title}`}
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </article>
    );
  }

  // Standard Blog Card
  return (
    <article className="group flex flex-col bg-[#FFFFFF] border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all duration-200">
      
      {/* Cover Image */}
      <Link to={`/blog/${id}`} className="block relative aspect-16/10 overflow-hidden bg-stone-100">
        {!imgError && coverImage ? (
          <img
            src={coverImage}
            alt={title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-100 text-stone-400">
            <BookOpen className="w-8 h-8 mb-1 stroke-1" />
            <span className="text-xs font-serif uppercase tracking-wider">{category}</span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          
          {/* Metadata: Unboxed text separated with dots */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-800">{category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{readTime}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <Link to={`/blog/${id}`} className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900 rounded">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-blue-800 transition-colors leading-snug line-clamp-2">
              {title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>

        {/* Author row */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`}
              alt={author?.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-200 shrink-0"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`;
              }}
            />
            <span className="text-xs font-medium text-stone-800 truncate">{author?.name}</span>
          </div>

          <Link
            to={`/blog/${id}`}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 shrink-0"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

    </article>
  );
}
