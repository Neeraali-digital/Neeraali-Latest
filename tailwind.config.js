/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Color Palette
        brand: {
          primary: '#f82a5d',
          light: '#ff5a7d',
          dark: '#d91e4a',
          50: '#fef2f4',
          100: '#fde6ea',
          200: '#fbd0db',
          300: '#f7aabf',
          400: '#f17ba0',
          500: '#f82a5d',
          600: '#e91e47',
          700: '#c4163a',
          800: '#a31535',
          900: '#8b1632',
        },
        // Neutral Palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Semantic Colors
        primary: '#f82a5d',
        secondary: '#171717',
        accent: '#f82a5d',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        // Display font for big text (headings)
        display: ['Montserrat', 'Oswald', 'system-ui', 'sans-serif'],
        // Body font for small text
        body: ['Poppins', 'Lato', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', fontWeight: '900' }],
        'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '800' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      fontWeight: {
        'extra-black': '900',
        'black': '800',
      },
    },
  },
  plugins: [],
}