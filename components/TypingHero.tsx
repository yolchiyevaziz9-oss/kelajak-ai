"use client";

import { useEffect, useState } from "react";

export function TypingHero({ phrases }: { phrases: readonly string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!del && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 38);
    } else if (!del && text.length === current.length) {
      timeout = setTimeout(() => setDel(true), 1800);
    } else if (del && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 20);
    } else if (del && text.length === 0) {
      setDel(false);
      setIdx((idx + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [text, del, idx, phrases]);

  return (
    <div className="min-h-[3.5rem] sm:min-h-[2.5rem] flex items-center">
      <p className="typing-cursor text-base sm:text-lg text-accent-300/90 font-medium">
        {text}
      </p>
    </div>
  );
}
