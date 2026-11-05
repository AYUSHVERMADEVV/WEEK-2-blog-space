import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useBlogs } from "../context/BlogContext.jsx";

export default function Toast() {
  const { toast, clearToast } = useBlogs();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isInfo = toast.type === "info";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-stone-900 text-stone-50 rounded-lg shadow-xl border border-stone-800 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {isInfo && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
      {!isSuccess && !isInfo && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
      <span className="text-sm font-medium pr-1">{toast.message}</span>
      <button
        onClick={clearToast}
        className="text-stone-400 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
