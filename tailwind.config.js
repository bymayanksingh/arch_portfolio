/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-black': 'var(--soft-black)',
        'soft-black-hover': 'var(--soft-black-hover)',
        'text-soft-black': 'var(--text-soft-black)',
      },
    },
  },
  plugins: [],
}
