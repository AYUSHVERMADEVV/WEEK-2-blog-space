import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, title, onConfirm, onCancel }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div
        className="w-full max-w-md bg-[#FAF9F5] border border-stone-300 rounded-xl p-6 shadow-2xl relative text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="delete-dialog-title" className="text-lg font-serif font-bold text-stone-900">
              Delete Article
            </h3>
            <p className="text-xs text-stone-500">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-stone-800 italic">"{title}"</span>? The story will be permanently removed from your local publication library.
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete Story
          </button>
        </div>
      </div>
    </div>
  );
}
