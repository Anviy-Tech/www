import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // New sophisticated color palette
        primary: '#1a1a1a',
        secondary: '#f8f7f4',
        accent: {
          DEFAULT: '#c9a96e',
          dark: '#a68a5c'
        },
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#fefefe'
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#6b6b6b',
          muted: '#9ca3af'
        },
        border: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6'
        },
        // Legacy colors for backward compatibility
        background: {
          DEFAULT: '#f8f7f4',
          soft: '#F7F4F0',
          contrast: '#FFFFFF'
        },
        charcoal: '#2E2E2E'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
};

export default config;


