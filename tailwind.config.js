/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: "#0B1220", 60: "rgba(11,18,32,.6)", 40: "rgba(11,18,32,.4)", 20: "rgba(11,18,32,.1)", 5: "rgba(11,18,32,.05)" },
        cyan:   { DEFAULT: "#06B6D4", 50: "#ECFEFF", 100: "#CFFAFE", 200: "#A5F3FC", 300: "#67E8F9", 400: "#22D3EE", 500: "#06B6D4", 600: "#0891B2", 700: "#0E7490" },
        orange: { DEFAULT: "#FB7B25", 50: "#FFF4ED", 100: "#FFE6D5", 500: "#FB7B25", 600: "#EA5C0B" },
        muted:  "#64748B",
        border: "#E5EDF2",
        bg:     "#F7FBFC"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body:    ["'Inter'",         "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'","ui-monospace","monospace"]
      },
      boxShadow: {
        card:   "0 1px 3px rgba(11,18,32,.07), 0 4px 12px rgba(11,18,32,.05)",
        "card-hover": "0 4px 16px rgba(11,18,32,.12), 0 1px 3px rgba(11,18,32,.06)",
        glow:   "0 0 0 3px rgba(6,182,212,.18)",
        toast:  "0 8px 24px rgba(11,18,32,.18)"
      },
      borderRadius: { xl2: "1rem", xl3: "1.5rem", xl4: "2rem" }
    }
  },
  plugins: []
};
