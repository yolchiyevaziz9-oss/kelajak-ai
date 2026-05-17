"use client";

// Markaziy AI sharchasi — atrofida aylanayotgan orbita va belgilar
import { GraduationCap, Wrench, Languages, MapPin, Sparkles, Target } from "lucide-react";

const ICONS = [
  { Icon: GraduationCap, label: "OTM" },
  { Icon: Wrench, label: "Hunar" },
  { Icon: Languages, label: "Til" },
  { Icon: MapPin, label: "Shahar" },
  { Icon: Target, label: "Maqsad" },
  { Icon: Sparkles, label: "AI" },
];

export function AIOrb() {
  return (
    <div className="relative mx-auto h-[360px] w-[360px] sm:h-[440px] sm:w-[440px]">
      {/* Orbit halqalari */}
      <div className="absolute inset-0 rounded-full border border-brand-500/20 animate-spin-slow" />
      <div className="absolute inset-10 rounded-full border border-accent-400/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "26s" }} />
      <div className="absolute inset-20 rounded-full border border-brand-300/10" />

      {/* Markaziy AI orb */}
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 sm:h-56 sm:w-56 ai-orb animate-pulse-soft" />

      {/* Markazda yozuv */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-[10px] tracking-[0.4em] text-accent-300/80 font-semibold uppercase">AI</div>
          <div className="font-display font-bold text-2xl sm:text-3xl gradient-text">Kelajak</div>
        </div>
      </div>

      {/* Aylanma belgilar */}
      {ICONS.map(({ Icon, label }, i) => {
        const angle = (i / ICONS.length) * Math.PI * 2;
        const r = 180; // orbit radius (px)
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <div
            key={label}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div className="group flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center shadow-lg shadow-brand-900/40 hover:scale-110 transition">
                <Icon className="h-5 w-5 text-accent-300" />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 opacity-0 group-hover:opacity-100 transition">
                {label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating zarrachalar */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="particle bg-accent-400/80"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            top: `${20 + (i * 11) % 70}%`,
            left: `${15 + (i * 17) % 80}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
