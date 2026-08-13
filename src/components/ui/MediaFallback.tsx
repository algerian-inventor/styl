import React from "react";
import { Atom, Cpu, Sparkles, Binary } from "lucide-react";

interface MediaFallbackProps {
  title?: string;
  category?: string;
  aspectRatio?: "16/9" | "16/10" | "4/3" | "1/1" | "auto";
  className?: string;
}

export const MediaFallback: React.FC<MediaFallbackProps> = ({
  title,
  category,
  aspectRatio = "16/10",
  className = "",
}) => {
  const aspectClasses = {
    "16/9": "aspect-video",
    "16/10": "aspect-[16/10]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "h-full w-full min-h-[220px]",
  };

  return (
    <div
      className={`relative w-full ${aspectClasses[aspectRatio]} bg-gradient-to-br from-[#062B55] via-[#08386E] to-[#041D38] overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}
    >
      {/* Scientific Geometric Pattern Background */}
      <div className="absolute inset-0 bg-sci-grid-dark opacity-40 pointer-events-none" />
      
      {/* Decorative abstract orbit circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 border border-brand-green/20 rounded-full pointer-events-none" />
      
      {/* Top Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-brand-green-accent">
            <Atom className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="text-xs font-bold text-slate-300 tracking-wider">
            STLY CONSTANTINE
          </span>
        </div>
        {category && (
          <span className="text-xs font-semibold bg-brand-green/20 text-brand-green-accent border border-brand-green/30 px-2.5 py-0.5 rounded">
            {category}
          </span>
        )}
      </div>

      {/* Center Icon & Title */}
      <div className="relative z-10 my-auto text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 shadow-inner">
          <Cpu className="w-6 h-6" />
        </div>
        {title && (
          <p className="text-sm font-semibold text-white/90 line-clamp-2 px-4 max-w-xs mx-auto">
            {title}
          </p>
        )}
      </div>

      {/* Bottom Subtle Scientific Branding */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <Binary className="w-3 h-3 text-brand-green" /> SCI-TECH
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-green-accent" /> INNOVATION
        </span>
      </div>
    </div>
  );
};
