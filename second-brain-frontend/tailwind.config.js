/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'bd-bg': '#f5f7ff',
        'bd-surface': '#ffffff',
        'bd-surface-raised': '#eef1ff',
        'bd-text': '#0d0f1a',
        'bd-text-sec': '#4b5280',
        'bd-accent': '#5b5ef4',
        'bd-border': 'rgba(0,0,0,0.08)',
        // Dark mode
        'bd-dark-bg': '#07080f',
        'bd-dark-surface': '#0f1018',
        'bd-dark-surface-raised': '#161824',
        'bd-dark-text': '#e8eaf5',
        'bd-dark-text-sec': '#8b90b8',
        'bd-dark-accent': '#7b7ef8',
        'bd-dark-border': 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Instrument Serif"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'orb-drift': 'orbDrift 20s ease-in-out infinite',
        'orb-drift-alt': 'orbDriftAlt 25s ease-in-out infinite',
        'particle-rise': 'particleRise 8s linear infinite',
        'dash': 'dash 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        orbDriftAlt: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) scale(1.08)' },
          '66%': { transform: 'translate(30px, -40px) scale(0.92)' },
        },
        particleRise: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        dash: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(91, 94, 244, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(91, 94, 244, 0.6)' },
        },
      },
      boxShadow: {
        'float': '0 4px 6px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.05)',
        'float-hover': '0 8px 16px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.08)',
        'float-dark': '0 4px 6px rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        'float-dark-hover': '0 8px 16px rgba(0,0,0,0.3), 0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,126,248,0.15)',
        'accent-glow': '0 0 0 1px rgba(91,94,244,0.3), 0 0 20px rgba(91,94,244,0.15)',
        'accent-glow-dark': '0 0 0 1px rgba(123,126,248,0.3), 0 0 20px rgba(123,126,248,0.2)',
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle, rgba(91,94,244,0.08) 1px, transparent 1px)',
        'grid-dark': 'radial-gradient(circle, rgba(123,126,248,0.08) 1px, transparent 1px)',
        'dot-light': 'radial-gradient(circle, rgba(91,94,244,0.12) 1.5px, transparent 1.5px)',
        'dot-dark': 'radial-gradient(circle, rgba(123,126,248,0.1) 1.5px, transparent 1.5px)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      screens: {
        'custom-xl': '1200px',
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow',
      },
    },
  },
  plugins: [],
}
