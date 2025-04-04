/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,tsx,ts}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        'xs': '500px'
      },
      scale: {
        '20': '0.2',
      },
      fontFamily: {
        'samim': ['samim', 'sans-serif'],
        'vazir': ['vazir', 'sans-serif']
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '4.5': '1.125rem',
        '2px': '2px',
        '5px': '5px',
        '22': '85px',
        '550': '550px',
        '480': '480px'
      },
      keyframes: {
        skeleton: {
          '0% ': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        left2right : {
          '0% ': { left: '0' },
          '100%': { left: '100%' },
        }
      },
      animation: {
        skeleton: 'skeleton 1s linear infinite',
        left2right: 'left2right 1.2s cubic-bezier(0.52, 0.22, 0.45, 0.74) infinite alternate',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      colors: {

        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        blue: {
          50: '#ebf2f9',
          100: '#cfe3fc',
          200: '#a0c8f8',
          300: '#70acf5',
          400: '#589ef3',
          500: '#2882f0',
          600: '#0f69d7',
          700: '#0d5ab9',
          800: '#0a468f',
          900: '#072f5f',
          950: '#04172f'
        },

        'body-background': 'var(--body-background)'

      },
      width: {
        '850':'850px',
        '520':'520px',
        '480':'480px',
        '400': '400px'
      },
      maxWidth: {
        container: 'var(--container-max-width)'
      },
      minHeight: {
        'desktop-main' : 'calc(100vh - 450px)'
      },
      grayscale: {
        50: '65%',
      },
      maxHeight: {
        'mobile-nav': 'calc(100vh - 90px)',
      },
      boxShadow: {
        'normal': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      },
      borderWidth: {
        '1':'1px',
        '3': '3px',
        '5' : '5px'
      },
      fontSize: {
        '5xs': '8px',
        '4xs':'10px',
        '3xs':'11px',
        '2xs': '12px',
        xs: '13px',
        sm: '14px',
        md: '15px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '38px'
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      rotate: {
        '135': '135deg',
      },
      textColor: {
        DEFAULT: '#ffffff'
      }
    },
  },
  plugins: [],
}