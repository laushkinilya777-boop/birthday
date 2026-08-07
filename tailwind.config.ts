import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 70px rgba(124, 58, 237, 0.18)',
        soft: '0 30px 80px rgba(15, 23, 42, 0.15)'
      },
      backgroundImage: {
        glass: 'radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 32%), radial-gradient(circle at right, rgba(236, 72, 153,0.14), transparent 28%)'
      },
      colors: {
        aurora: '#7C3AED',
        rose: '#EC4899',
        lilac: '#A855F7',
        blush: '#F472B6'
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
