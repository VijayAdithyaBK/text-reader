/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keeping logical names but mapping to new palette
        primary: '#6366f1', // Indigoish
        secondary: '#a5b4fc',

        // Brand Specific
        brand: {
          blue: '#e0e7ff', // Soft background blue
          purple: '#818cf8', // Primary accent
          orange: '#fb923c', // Secondary accent
          green: '#4ade80', // Success/Green accent
          dark: '#1e293b'
        },

        background: '#eef2ff', // Very light blue/white
        surface: '#ffffff',
        text: '#1e293b',
        muted: '#64748b'
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'], // Ideally we'd load Outfit font
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
