import React, { useState } from "react";
import { PRESET_COVERS, CATEGORIES } from "../data/sampleBlogs.js";
import { Eye, Edit3, Image as ImageIcon, Check, AlertCircle, ArrowLeft } from "lucide-react";

export default function BlogForm({
  initialValues = {},
  onSubmit,
  isEditing = false,
  onCancel
}) {
  const [formData, setFormData] = useState({
    title: initialValues.title || "",
    authorName: initialValues.author?.name || initialValues.authorName || "",
    authorBio: initialValues.author?.bio || initialValues.authorBio || "",
    authorAvatar: initialValues.author?.avatar || initialValues.authorAvatar || "",
    category: initialValues.category || "Technology",
    customCategory: "",
    coverImage: initialValues.coverImage || PRESET_COVERS[0].url,
    excerpt: initialValues.excerpt || "",
    content: initialValues.content || ""
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCategories = CATEGORIES.filter((c) => c !== "All");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please provide an article title.";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title should be at least 5 characters long.";
    }

    if (!formData.authorName.trim()) {
      newErrors.authorName = "Author name is required.";
    }

    const finalCategory = formData.category === "Custom" ? formData.customCategory.trim() : formData.category;
    if (!finalCategory) {
      newErrors.category = "Please select or specify a category.";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "A short summary/excerpt is required.";
    } else if (formData.excerpt.trim().length < 15) {
      newErrors.excerpt = "Summary should be at least 15 characters.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Article content cannot be empty.";
    } else if (formData.content.trim().length < 40) {
      newErrors.content = "Article content should be at least 40 characters.";
    }

    if (!formData.coverImage.trim()) {
      newErrors.coverImage = "Please select or provide a cover image URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Switch to editor tab if user was in preview mode
      setActiveTab("editor");
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    const finalCategory = formData.category === "Custom" ? formData.customCategory.trim() : formData.category;

    onSubmit({
      ...formData,
      category: finalCategory
    });
  };

  // Helper to render preview formatted text
  const renderFormattedPreview = (rawContent) => {
    const lines = rawContent.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-xl font-serif font-bold text-stone-900 mt-6 mb-2">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-3">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={idx} className="my-6 py-2 px-6 border-l-2 border-stone-800 italic text-stone-700 font-serif text-lg">
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="ml-6 list-disc text-stone-700 mb-1 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      return (
        <p key={idx} className="text-stone-700 leading-relaxed mb-4 text-base font-serif">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden">
      
      {/* Form Mode Header Tabs (Editor vs Live Reader Preview) */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/60">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "editor"
                ? "bg-white text-stone-900 shadow-2xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "preview"
                ? "bg-white text-stone-900 shadow-2xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Reader Preview</span>
          </button>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-medium text-stone-500 hover:text-stone-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Editor Tab */}
      {activeTab === "editor" ? (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Article Title */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Article Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. The Architecture of Quiet Light: Designing Spaces for Contemplation"
              className={`w-full px-4 py-3 text-base sm:text-lg font-serif border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15 ${
                errors.title ? "border-rose-400 bg-rose-50/20" : "border-stone-300 bg-white"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Author Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="authorName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Author Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="authorName"
                type="text"
                value={formData.authorName}
                onChange={(e) => handleChange("authorName", e.target.value)}
                placeholder="e.g. Elena Vance"
                className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15 ${
                  errors.authorName ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
                }`}
              />
              {errors.authorName && (
                <p className="text-xs text-rose-600 mt-1">{errors.authorName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="authorBio" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Author Role / Bio <span className="text-stone-400">(Optional)</span>
              </label>
              <input
                id="authorBio"
                type="text"
                value={formData.authorBio}
                onChange={(e) => handleChange("authorBio", e.target.value)}
                placeholder="e.g. Architect & essayist based in Zurich"
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Category / Topic <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleChange("category", cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    formData.category === cat
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleChange("category", "Custom")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  formData.category === "Custom"
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                + Custom Topic
              </button>
            </div>

            {formData.category === "Custom" && (
              <div className="mt-2">
                <input
                  type="text"
                  value={formData.customCategory}
                  onChange={(e) => handleChange("customCategory", e.target.value)}
                  placeholder="Type custom category name (e.g. Science, Leadership, Economics)"
                  className="w-full max-w-sm px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15"
                />
              </div>
            )}
            {errors.category && (
              <p className="text-xs text-rose-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Cover Image Selection (Curated Presets + Custom URL) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Cover Image <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-stone-500">Pick a preset or paste an image URL</span>
            </div>

            {/* Quick Presets Picker */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_COVERS.map((preset, index) => {
                const isSelected = formData.coverImage === preset.url;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleChange("coverImage", preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left group aspect-4/3 transition-all ${
                      isSelected
                        ? "border-blue-700 ring-2 ring-blue-700/20 shadow-xs"
                        : "border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-stone-900/70 text-[10px] text-white px-1 py-0.5 truncate text-center">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Manual URL Input */}
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => handleChange("coverImage", e.target.value)}
                placeholder="Or paste any custom image URL (https://...)"
                className="w-full pl-9 pr-4 py-2 text-xs font-mono border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15"
              />
            </div>
            {errors.coverImage && (
              <p className="text-xs text-rose-600 mt-1">{errors.coverImage}</p>
            )}
          </div>

          {/* Short Excerpt */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="excerpt" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Short Description / Excerpt <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-stone-400">{formData.excerpt.length} characters</span>
            </div>
            <textarea
              id="excerpt"
              rows={2}
              value={formData.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              placeholder="A captivating 1-2 sentence hook displayed on article cards and search results..."
              className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15 ${
                errors.excerpt ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
              }`}
            />
            {errors.excerpt && (
              <p className="text-xs text-rose-600 mt-1">{errors.excerpt}</p>
            )}
          </div>

          {/* Full Article Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Full Article Content <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-stone-400">
                Supports ## Subheading, &gt; Quote, * Bullet
              </span>
            </div>
            <textarea
              id="content"
              rows={12}
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Write your complete story here. Separate paragraphs with double enter. Use '## Subheading' for sections, '> Quote' for pull-quotes, and '* item' for bullet lists..."
              className={`w-full px-4 py-3 text-sm font-serif leading-relaxed border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900/15 ${
                errors.content ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
              }`}
            />
            {errors.content && (
              <p className="text-xs text-rose-600 mt-1">{errors.content}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg transition-all shadow-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? "Save Changes" : "Publish Article"}</span>
            </button>
          </div>

        </form>
      ) : (
        /* Live Reader Preview Tab */
        <div className="p-6 sm:p-10 max-w-3xl mx-auto">
          
          <div className="mb-6 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">
              <span className="text-blue-700">
                {formData.category === "Custom" ? formData.customCategory || "Topic" : formData.category}
              </span>
              <span>·</span>
              <span>Preview Mode</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight mb-4">
              {formData.title || "Untitled Story"}
            </h1>
            <p className="text-base text-stone-600 italic font-serif leading-relaxed mb-6">
              {formData.excerpt || "Your article excerpt will appear here."}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center font-serif font-bold text-stone-700">
                {formData.authorName ? formData.authorName.charAt(0) : "A"}
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {formData.authorName || "Author Name"}
                </div>
                <div className="text-xs text-stone-500">
                  {formData.authorBio || "Writer & contributor"}
                </div>
              </div>
            </div>
          </div>

          {/* Cover image preview */}
          {formData.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden aspect-16/9 bg-stone-100">
              <img
                src={formData.coverImage}
                alt="Article Cover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body content preview */}
          <div className="prose prose-stone max-w-none">
            {formData.content ? (
              renderFormattedPreview(formData.content)
            ) : (
              <p className="text-stone-400 italic">No article content written yet.</p>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-stone-200 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Back to Editor to make adjustments</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              {isEditing ? "Save Changes" : "Publish Now"}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
