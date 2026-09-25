/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F0E6',
          cream: '#F5F0E6',
          card: '#FFFCF5',
          ivory: '#FFFCF5',
          'cream-dark': '#EAE4D8',
          secondary: '#EAE4D8',
          editorial: '#F5F0E6',
          canvas: '#F5F0E6',
          white: '#FFFFFF',
          surface: '#FFFCF5',
          blue: '#243FBA',
          'blue-dark': '#172B82',
          'blue-light': '#E8ECFF',
          accent: '#243FBA',
          'accent-light': '#E8ECFF',
          'accent-hover': '#172B82',
          text: '#191919',
          muted: '#686868',
          border: '#DDD7CA',
          button: '#243FBA',
          'button-text': '#FFFFFF',
          success: '#16A34A',
          error: '#DC2626',
        },
        primary: {
          bg: '#F5F0E6',
          text: '#191919',
          DEFAULT: '#243FBA',
          dark: '#172B82',
          light: '#E8ECFF',
          hover: '#172B82',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F5F0E6',
          200: '#FFFCF5',
          300: '#DDD7CA',
        },
        secondary: {
          text: '#686868',
          dark: '#191919',
        },
        success: '#16A34A',
        error: '#DC2626',
        warning: '#D97706',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        editorial: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(25, 25, 25, 0.04)',
        'card': '0 4px 16px -2px rgba(25, 25, 25, 0.06), 0 2px 6px -1px rgba(25, 25, 25, 0.03)',
        'float': '0 16px 36px -6px rgba(25, 25, 25, 0.1), 0 4px 12px -2px rgba(25, 25, 25, 0.04)',
        'glow': '0 0 25px -5px rgba(36, 63, 186, 0.3)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
