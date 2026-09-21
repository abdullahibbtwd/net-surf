/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        canvas: '#F8FAFC',
        line: '#E2E8F0',
        ink: '#1E293B', // Midnight Ink
        muted: '#64748B',
        accent: '#0EA5E9', // Electric Teal
        'accent-soft': '#F0FDFA', // Mint Tint
        teal: '#0EA5E9',
        mint: '#F0FDFA',
        brand: '#0EA5E9',
        'brand-soft': '#F0FDFA',
        navy: '#1E293B',
        cyan: '#0EA5E9',
        'cyan-soft': '#F0FDFA',
        purple: '#0EA5E9',
        'purple-soft': '#F0FDFA',
      },
      fontFamily: {
        display: ['DM Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
      },
    },
  },
  plugins: [],
};
