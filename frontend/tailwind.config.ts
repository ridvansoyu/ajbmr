import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2f7',
          100: '#d0dbe9',
          200: '#a0b5d3',
          300: '#7390bd',
          400: '#476da7',
          500: '#345591',
          600: '#1a365d',
          700: '#152a4c',
          800: '#101f39',
          900: '#0a1526',
        },
        secondary: {
          50: '#faeaea',
          100: '#f4c8c7',
          200: '#e99390',
          300: '#dd5d58',
          400: '#c83e39',
          500: '#b23430',
          600: '#9e2b25',
          700: '#7a221e',
          800: '#591816',
          900: '#3b0f0e',
        },
        accent: {
          50: '#f9f5ee',
          100: '#f2e9d9',
          200: '#e5d4b3',
          300: '#d8be8d',
          400: '#c8a97e',
          500: '#b99766',
          600: '#a17f50',
          700: '#816642',
          800: '#5e4a30',
          900: '#3d301f',
        },
        success: {
          50: '#ecf9ec',
          100: '#c7edc7',
          200: '#93da93',
          300: '#5fc75f',
          400: '#3cb43c',
          500: '#2e8a2e',
          600: '#246024',
          700: '#1a471a',
          800: '#133313',
          900: '#0b200b',
        },
        warning: {
          50: '#fef9e6',
          100: '#fcf0bf',
          200: '#f9e086',
          300: '#f5cf4d',
          400: '#f2c01a',
          500: '#d1a60f',
          600: '#a3810c',
          700: '#765d08',
          800: '#483905',
          900: '#1a1502',
        },
        error: {
          50: '#fdecec',
          100: '#facaca',
          200: '#f69898',
          300: '#f26767',
          400: '#ef3535',
          500: '#d71a1a',
          600: '#b61616',
          700: '#941212',
          800: '#730e0e',
          900: '#510a0a',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#3f3f3f',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config


