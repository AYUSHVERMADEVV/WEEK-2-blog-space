import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
        404 · Page Not Found
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
        Lost in the Archives
      </h1>
      <p className="text-stone-600 font-serif text-base max-w-md mx-auto leading-relaxed">
        The page you are looking for doesn't exist or has wandered into another edition of the publication.
      </p>
      <div className="pt-4 flex items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/explore"
          className="px-5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-200/80 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Stories</span>
        </Link>
      </div>
    </div>
  );
}
