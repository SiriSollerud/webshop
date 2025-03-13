import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          '50': '#f2f4ff',
          '100': '#e6e9ff',
          '200': '#d1d6ff',
          '300': '#acb3ff',
          '400': '#7d83ff',
          '500': '#4b49ff',
          '600': '#3124ff',
          '700': '#2312ef',
          '800': '#1c0ec9',
          '900': '#1a0ea4',
          '950': '#070452'
        },
        'mid-blue': {
          '50': '#eaf1ff',
          '100': '#d9e4ff',
          '200': '#baccff',
          '300': '#91aaff',
          '400': '#6579ff',
          '500': '#424bff',
          '600': '#2821ff',
          '700': '#2016ec',
          '800': '#1c16c5',
          '900': '#1c1b94',
          '950': '#121056'
        },

        'telenor-blue': {
          '50': '#effbff',
          '100': '#def5ff',
          '200': '#b6eeff',
          '300': '#75e3ff',
          '400': '#2cd6ff',
          '500': '#00c8ff',
          '600': '#009cd4',
          '700': '#007cab',
          '800': 'hsl(196, 100%, 28%)',
          '900': 'hsl(196, 90%, 24%)',
          '950': 'hsl(198, 90%, 16%)'
        },
        'light-blue': {
          '50': '#ebfffd',
          '100': '#cdfffe',
          '200': '#b4ffff',
          '300': '#62fcfe',
          '400': 'hsl(182, 92%, 53%)',
          '450': 'hsl(182, 100%, 50%)',
          '500': 'hsl(182, 100%, 43%)',
          '600': '#02a8b8',
          '700': '#0a8594',
          '800': '#126b78',
          '900': '#135866',
          '950': '#063b46'
        },
        'off-white': {
          '50': '#e8fdff',
          '100': '#cff8fe',
          '200': '#a5f0fc',
          '300': '#67e3f9',
          '400': '#22ccee',
          '500': '#06afd4',
          '600': '#088bb2',
          '700': '#0e7090',
          '800': '#155b75',
          '900': '#164b63',
          '950': '#083144'
        }
      },
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
        heading: ['Montserrat', ...fontFamily.sans]
      }
    }
  },
  plugins: []
} satisfies Config
