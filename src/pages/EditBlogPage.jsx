import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, ArrowLeft, AlertCircle } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";
import BlogForm from "../components/BlogForm.jsx";

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, updateBlog } = useBlogs();

  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <AlertCircle className="w-8 h-8 stroke-1" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Cannot Edit: Article Not Found
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            The article you are trying to edit does not exist or may have been deleted.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/explore"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Archive</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdate = (formData) => {
    updateBlog(id, formData);
    navigate(`/blog/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-stone-200">
        <Link
          to={`/blog/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Story</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
          <Edit className="w-3.5 h-3.5 text-blue-700" />
          <span>Editorial Revision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Edit Story
        </h1>
        <p className="text-stone-600 font-serif text-base max-w-2xl leading-relaxed">
          Refine your prose, update details, or revise the cover image. Changes persist in your browser LocalStorage immediately upon saving.
        </p>
      </div>

      {/* Blog Edit Form */}
      <BlogForm
        initialValues={{
          title: blog.title,
          authorName: blog.author?.name,
          authorBio: blog.author?.bio,
          authorAvatar: blog.author?.avatar,
          category: blog.category,
          coverImage: blog.coverImage,
          excerpt: blog.excerpt,
          content: blog.content
        }}
        onSubmit={handleUpdate}
        isEditing={true}
        onCancel={() => navigate(`/blog/${id}`)}
      />

    </div>
  );
}
