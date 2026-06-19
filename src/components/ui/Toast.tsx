"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { usePrototypeState } from "@/context/PrototypeStateContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePrototypeState();

  return (
    <div className="fixed bottom-5 end-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-white shadow-lg transition-all-custom ${
              toast.type === "success"
                ? "border-emerald-100 text-slate-800"
                : toast.type === "error"
                ? "border-rose-100 text-slate-800"
                : "border-blue-100 text-slate-800"
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="h-5 w-5 text-rose-500" />
              )}
              {toast.type === "info" && (
                <Info className="h-5 w-5 text-blue-500" />
              )}
            </div>

            {/* Content */}
            <div className="flex-grow text-sm font-medium leading-relaxed text-start">
              {toast.message}
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
