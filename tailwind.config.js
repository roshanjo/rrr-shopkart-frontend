/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6d28d9', // Violet-700 for a SaaS vibe
          secondary: '#10b981', // Emerald for healthy accents
          accent: '#7c3aed', // Hover states
          dark: '#0f172a', // Slate-900 for modern dark sections
          light: '#f8fafc', // Slate-50 background
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 10px -1px rgba(0, 0, 0, 0.02)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 8px 20px -6px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
