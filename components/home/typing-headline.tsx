"use client";

import { useEffect, useMemo, useState } from "react";

type TypingHeadlineProps = {
  phrases: string[];
  typingSpeedMs?: number;
  pauseMs?: number;
  className?: string;
};

export function TypingHeadline({
  phrases,
  typingSpeedMs = 90,
  pauseMs = 1200,
  className,
}: TypingHeadlineProps) {
  const safePhrases = useMemo(
    () => phrases.filter((phrase) => phrase.trim().length > 0),
    [phrases],
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const longestPhrase = useMemo(
    () =>
      safePhrases.reduce(
        (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
        "",
      ),
    [safePhrases],
  );

  useEffect(() => {
    if (safePhrases.length === 0) {
      return;
    }

    const current = safePhrases[phraseIndex % safePhrases.length];
    const isCompleted = text === current;
    const nextText = isCompleted
      ? ""
      : current.slice(0, Math.min(current.length, text.length + 1));

    const delay = isCompleted ? pauseMs : typingSpeedMs;

    const timer = window.setTimeout(() => {
      if (isCompleted) {
        setText("");
        setPhraseIndex((prev) => (prev + 1) % safePhrases.length);
        return;
      }

      setText(nextText);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    safePhrases,
    phraseIndex,
    text,
    typingSpeedMs,
    pauseMs,
  ]);

  const displayText = safePhrases.length === 0 ? "" : text;

  return (
    <span className="relative inline-flex align-baseline">
      <span className="invisible">{longestPhrase}</span>
      <span className={`absolute left-0 top-0 ${className ?? ""}`.trim()}>
        {displayText}
        <span className="ml-1 inline-block w-2 animate-pulse text-primary">|</span>
      </span>
    </span>
  );
}
