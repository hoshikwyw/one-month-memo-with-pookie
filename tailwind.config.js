export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kwyw/kayv-glass-ui/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        lato:     ['Lato', 'sans-serif'],
      },
      colors: {
        kv: {
          50:  'rgb(var(--kv-p-50)  / <alpha-value>)',
          100: 'rgb(var(--kv-p-100) / <alpha-value>)',
          200: 'rgb(var(--kv-p-200) / <alpha-value>)',
          300: 'rgb(var(--kv-p-300) / <alpha-value>)',
          400: 'rgb(var(--kv-p-400) / <alpha-value>)',
          500: 'rgb(var(--kv-p-500) / <alpha-value>)',
          600: 'rgb(var(--kv-p-600) / <alpha-value>)',
          700: 'rgb(var(--kv-p-700) / <alpha-value>)',
        },
      },
      animation: {
        'heart':      'heartbeat 1.6s ease-in-out infinite',
        'float':      'floatY 3.5s ease-in-out infinite',
        'fadeup':     'fadeUp 0.6s ease-out both',
        'glow':       'glow 2.4s ease-in-out infinite',
        'slide-down': 'slideDown 0.5s cubic-bezier(.22,.68,0,1.2) both',
        'flip-left':  'flipLeft 0.48s cubic-bezier(0.45,0,1,1) forwards',
        'flip-right': 'flipRight 0.48s cubic-bezier(0.45,0,1,1) forwards',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%':      { transform: 'scale(1.18)' },
          '28%':      { transform: 'scale(1.02)' },
          '42%':      { transform: 'scale(1.12)' },
          '56%':      { transform: 'scale(1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(236,72,153,.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(236,72,153,.75),0 0 60px rgba(249,168,212,.4)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'scaleY(0.85) translateY(-12px)' },
          to:   { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        flipLeft: {
          '0%':   { transform: 'perspective(1000px) rotateY(0deg)',    opacity: '1' },
          '65%':  { opacity: '0.15' },
          '100%': { transform: 'perspective(1000px) rotateY(-172deg)', opacity: '0' },
        },
        flipRight: {
          '0%':   { transform: 'perspective(1000px) rotateY(0deg)',   opacity: '1' },
          '65%':  { opacity: '0.15' },
          '100%': { transform: 'perspective(1000px) rotateY(172deg)', opacity: '0' },
        },
      },
    },
  },
}
