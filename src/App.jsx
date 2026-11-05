import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import CreateBlogPage from "./pages/CreateBlogPage.jsx";
import EditBlogPage from "./pages/EditBlogPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Helper to scroll to top automatically on page route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/create" element={<CreateBlogPage />} />
              <Route path="/edit/:id" element={<EditBlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </BlogProvider>
    </BrowserRouter>
  );
}
