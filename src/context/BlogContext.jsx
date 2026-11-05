import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_BLOGS } from "../data/sampleBlogs.js";

const LOCAL_STORAGE_KEY = "blogspace_posts_v1";

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  // Initialize blogs from LocalStorage or fallback to INITIAL_BLOGS
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading blogs from localStorage:", e);
    }
    return INITIAL_BLOGS;
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  // Sync blogs to LocalStorage whenever blogs state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
    } catch (e) {
      console.error("Error saving blogs to localStorage:", e);
    }
  }, [blogs]);

  // Helper to calculate approximate reading time
  const calculateReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  // Create a slug ID from title
  const generateSlug = (title) => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    return `${base || "post"}-${Date.now().toString().slice(-4)}`;
  };

  // Add new blog post
  const addBlog = (blogData) => {
    const newPost = {
      id: generateSlug(blogData.title),
      title: blogData.title.trim(),
      excerpt: blogData.excerpt ? blogData.excerpt.trim() : blogData.content.slice(0, 140) + "...",
      category: blogData.category || "General",
      author: {
        name: blogData.authorName?.trim() || "Anonymous Contributor",
        avatar: blogData.authorAvatar?.trim() || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(blogData.authorName || "Writer")}`,
        bio: blogData.authorBio?.trim() || "Essayist and contributor at BlogSpace."
      },
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: calculateReadTime(blogData.content),
      coverImage: blogData.coverImage?.trim() || "/src/assets/images/editorial_architecture_1793274534852.jpg",
      featured: false,
      content: blogData.content.trim()
    };

    setBlogs((prev) => [newPost, ...prev]);
    showToast("Story published successfully!");
    return newPost.id;
  };

  // Update existing blog post
  const updateBlog = (id, updatedData) => {
    let updatedId = id;
    setBlogs((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const updated = {
            ...post,
            title: updatedData.title !== undefined ? updatedData.title.trim() : post.title,
            excerpt: updatedData.excerpt !== undefined ? updatedData.excerpt.trim() : post.excerpt,
            category: updatedData.category !== undefined ? updatedData.category : post.category,
            coverImage: updatedData.coverImage !== undefined ? updatedData.coverImage.trim() : post.coverImage,
            content: updatedData.content !== undefined ? updatedData.content.trim() : post.content,
            readTime: updatedData.content ? calculateReadTime(updatedData.content) : post.readTime,
            author: {
              ...post.author,
              name: updatedData.authorName !== undefined ? updatedData.authorName.trim() : post.author.name,
              avatar: updatedData.authorAvatar !== undefined && updatedData.authorAvatar.trim() ? updatedData.authorAvatar.trim() : post.author.avatar,
              bio: updatedData.authorBio !== undefined ? updatedData.authorBio.trim() : post.author.bio
            }
          };
          return updated;
        }
        return post;
      })
    );
    showToast("Article updated successfully!");
    return updatedId;
  };

  // Delete blog post
  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((post) => post.id !== id));
    showToast("Article was deleted.", "info");
  };

  // Reset back to initial sample dataset
  const resetToSample = () => {
    setBlogs(INITIAL_BLOGS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    showToast("Reset to sample articles!");
  };

  // Retrieve single post by id
  const getBlogById = (id) => {
    return blogs.find((post) => post.id === id) || null;
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        resetToSample,
        getBlogById,
        toast,
        showToast,
        clearToast
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}
