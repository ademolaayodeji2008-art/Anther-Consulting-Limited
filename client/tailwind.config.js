/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand blue — buttons, links, accents
        primary: '#1414F0',
        // Footer background blue
        'footer-blue': '#1400EB',
        // Dark navy — headings, main text
        navy: '#0A1A3C',
        // Body text gray
        body: '#4B5563',
        // Convenience alias
        white: '#FFFFFF',
      },
      fontFamily: {
        // Serif — headings (Who We Are, Our Services, etc.)
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        // Sans-serif — body text, navigation
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
