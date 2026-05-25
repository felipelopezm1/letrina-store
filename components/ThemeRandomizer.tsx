"use client";

import { useEffect } from "react";

const themeNames = [
  "ascii-pit",
  "blue-terminal",
  "soft-type",
  "ink-brush",
  "gallery-index",
] as const;

export function ThemeRandomizer() {
  useEffect(() => {
    const theme = themeNames[Math.floor(Math.random() * themeNames.length)];
    document.documentElement.dataset.skin = theme;
  }, []);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(){var t=["ascii-pit","blue-terminal","soft-type","ink-brush","gallery-index"],e=t[Math.floor(Math.random()*t.length)];document.documentElement.dataset.skin=e}();`,
      }}
    />
  );
}
