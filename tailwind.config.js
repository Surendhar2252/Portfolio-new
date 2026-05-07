export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.16)',
        'glow-lg': '0 0 60px rgba(56, 189, 248, 0.22)',
        'glow-violet': '0 0 30px rgba(168, 85, 247, 0.18)',
        'glow-card': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,189,248,0.08)',
      },
      colors: {
        brand: {
          DEFAULT: '#22d3ee',
          light: '#38bdf8',
          soft: '#0e7490',
        },
        violet: {
          glow: '#a855f7',
        }
      },
      animation: {
        'hue-rotate': 'hue 8s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'draw-line': 'drawLine 1.5s ease forwards',
      },
      keyframes: {
        hue: {
          from: { filter: 'hue-rotate(0deg)' },
          to: { filter: 'hue-rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drawLine: {
          from: { height: '0%' },
          to: { height: '100%' },
        }
      }
    }
  },
  plugins: []
};
