import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Edit, 
  Trash2, 
  Bookmark, 
  BookOpen,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import DeleteConfirmModal from "../components/DeleteConfirmModal.jsx";
import BlogCard from "../components/BlogCard.jsx";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, deleteBlog, blogs, showToast } = useBlogs();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const blog = getBlogById(id);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle invalid blog ID gracefully
  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <AlertCircle className="w-8 h-8 stroke-1" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Article Not Found
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            The story you are looking for may have been deleted, moved, or the link might be broken.
          </p>
        </div>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            to="/explore"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Archive</span>
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const { title, excerpt, category, author, publishedAt, readTime, coverImage, content } = blog;

  // Format date
  const formattedDate = (() => {
    try {
      const d = new Date(publishedAt);
      if (isNaN(d.getTime())) return publishedAt;
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return publishedAt;
    }
  })();

  // Handle share / copy link
  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      showToast("Article URL ready to share.");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    deleteBlog(id);
    setIsDeleteModalOpen(false);
    navigate("/explore");
  };

  // Find related blogs (same category or others)
  const relatedBlogs = blogs
    .filter((b) => b.id !== id && (b.category === category || true))
    .slice(0, 3);

  // Formatter for markdown-like content
  const renderFormattedArticle = (rawContent) => {
    if (!rawContent) return null;
    const lines = rawContent.split("\n");
    let isFirstParagraph = true;

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;

      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-10 mb-4 pt-4 border-t border-stone-200/60">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("> ")) {
        return (
          <figure key={idx} className="my-8 py-4 px-6 sm:px-8 border-l-2 border-stone-800 bg-stone-100/50 rounded-r-lg">
            <blockquote className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed">
              {trimmed.replace("> ", "")}
            </blockquote>
          </figure>
        );
      }

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="ml-6 list-disc text-stone-700 mb-2 leading-relaxed font-serif text-lg">
            {trimmed.substring(2)}
          </li>
        );
      }

      // Check for first paragraph drop cap
      if (isFirstParagraph) {
        isFirstParagraph = false;
        return (
          <p
            key={idx}
            className="text-stone-800 leading-relaxed mb-6 text-lg sm:text-xl font-serif first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950"
          >
            {trimmed}
          </p>
        );
      }

      return (
        <p key={idx} className="text-stone-800 leading-relaxed mb-6 text-lg sm:text-xl font-serif">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Sticky Reading Progress Rail */}
      <div className="fixed top-18 left-0 right-0 h-[2px] bg-stone-200 z-30">
        <div
          className="h-full bg-blue-700 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Blogs</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Share / Copy button */}
            <button
              onClick={handleShare}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title="Copy link to story"
              aria-label="Share story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Edit button */}
            <Link
              to={`/edit/${id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-lg transition-colors"
              title="Edit article"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>

            {/* Delete button */}
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
              title="Delete article"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          
          {/* Metadata (Unboxed text with dots) */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
            <Link
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="text-blue-700 hover:underline"
            >
              {category}
            </Link>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{readTime}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{formattedDate}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-[1.12] tracking-tight">
            {title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-lg sm:text-xl text-stone-600 font-serif leading-relaxed italic">
            {excerpt}
          </p>

          {/* Author Block */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-200/80">
            <div className="flex items-center gap-3">
              <img
                src={author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`}
                alt={author?.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-1 ring-stone-200"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`;
                }}
              />
              <div>
                <div className="text-sm font-bold text-stone-900">{author?.name}</div>
                <div className="text-xs text-stone-500">{author?.bio || "Writer & essayist"}</div>
              </div>
            </div>
          </div>

        </header>

        {/* Main Cover Image */}
        {coverImage && (
          <div className="mb-12 rounded-2xl overflow-hidden aspect-16/9 bg-stone-100 shadow-xs border border-stone-200/80">
            {!imgError ? (
              <img
                src={coverImage}
                alt={title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-100 text-stone-400">
                <BookOpen className="w-12 h-12 mb-2 stroke-1" />
                <span className="text-xs font-serif uppercase tracking-widest">{category}</span>
              </div>
            )}
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-2xl mx-auto py-2">
          {renderFormattedArticle(content)}
        </div>

        {/* Post-reading Author Box */}
        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-stone-200 bg-[#F4F1EA] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(author?.name || "Author")}`}
            alt={author?.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-300"
          />
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Written by</span>
            <h4 className="text-lg font-serif font-bold text-stone-900">{author?.name}</h4>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              {author?.bio || "Contributor to BlogSpace. Dedicated to slow, thoughtful analysis and craftsmanship."}
            </p>
          </div>
        </div>

        {/* Related Stories */}
        {relatedBlogs.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                More Stories From BlogSpace
              </h3>
              <Link
                to="/explore"
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
              >
                <span>View archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </section>
        )}

      </article>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title={title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
