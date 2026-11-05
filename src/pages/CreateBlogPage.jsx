import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { PenSquare, ArrowLeft, Sparkles } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import BlogForm from "../components/BlogForm.jsx";

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { addBlog } = useBlogs();

  const handleCreate = (formData) => {
    const newId = addBlog(formData);
    navigate(`/blog/${newId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-stone-200">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
          <PenSquare className="w-3.5 h-3.5 text-blue-700" />
          <span>Editorial Submission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Publish a New Story
        </h1>
        <p className="text-stone-600 font-serif text-base max-w-2xl leading-relaxed">
          Share your essays, technical breakdowns, or creative reflections. Every article is immediately preserved in your local browser library.
        </p>
      </div>

      {/* Blog Creation Form */}
      <BlogForm
        onSubmit={handleCreate}
        isEditing={false}
        onCancel={() => navigate(-1)}
      />

    </div>
  );
}
