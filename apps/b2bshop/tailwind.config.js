const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey: '#6F6F6F',
        error: {
          300: '#CB5757',
        },
        brand: {
          DEFAULT: '#1C8C64',
          dark: '#2D2D2D',
          light: '#ffffff',
          muted: '#4A4A4A',
          'muted-two': '#CCCCCC',
          'muted-three': '#AEAEAE',
          tree: '#DCF3D7',
          'tree-dark': '#0B4635',
          danger: '#dc2626',
          'green-card': '#DCF3D7',
        },
        yellow: {
          DEFAULT: '#f98f14',
          100: '#f3b81f',
          200: '#ffc33c',
          300: '#edc537',
        },
        fill: {
          base: '#f3f6f9',
          secondary: '#F9F9F9',
          thumbnail: '#F2F2F2',
          'dropdown-hover': '#f6f9fc',
          one: '#f1f6f9',
          two: '#f2f2f2',
          three: '#e8ebf0',
          four: '#e5eaf1',
          five: '#8F8F8F',
          six: '#6B6B6B',
        },
        border: {
          base: '#e7ecf0',
          one: '#e3e8ec',
          two: '#e2e8f0',
          three: '#e6e6e6',
          four: '#dee5ea',
          five: '#E7E7E7',
        },
      },
      fontSize: {
        '10px': '.625rem',
        '13px': '13px',
        '15px': '15px',
      },
      screens: {
        xs: '475px',
        '3xl': '1780px',
        '4xl': '1921px',
        ...defaultTheme.screens,
      },
      spacing: {
        '430px': '430px',
        '450px': '450px',
        '500px': '500px',
        '64vh': '64vh',
      },
      minHeight: {
        '50px': '50px',
      },
      scale: {
        80: '0.8',
        85: '0.85',
        300: '3',
        400: '4',
      },
      width: {
        '1/9': '11.1111111%',
        '100+30': 'calc(100% + 30px)',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        shine: 'shine 0.8s ease-in',
        ping: 'ping 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        body: ["'Lato', sans-serif"],
        manrope: ["'Manrope', sans-serif"],
        source_serif_pro: ["'Source Serif Pro', serif"],
      },
      boxShadow: {
        card: '0px 4px 6px rgba(0, 0, 0, 0.06)',
        cardHover: '0px 0px 8px rgba(79, 95, 120, 0.18)',
        category: '0px 1px 6px rgba(79, 95, 120, 0.12)',
        navigation: '0 3px 6px rgba(115, 125, 144, 0.25)',
        counter: '0px 4px 10px rgba(79, 95, 120, 0.15)',
        featured: '0px 4px 8px rgba(70, 84, 111, 0.06)',
        cart: '0 3px 6px rgba(0,0,0,0.12)',
        switch: '0 2px 5px rgba(21,35,49,0.4)',
        dropDown: '0px 10px 40px rgba(41, 50, 68, 0.15)',
        carouselButton: '0px 2px 15px rgba(115, 125, 144, 0.25)',
        listProduct: '0 2px 4px rgba(0,0,0,.08)',
        navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
        header: '0 2px 3px rgba(0, 0, 0, 0.08)',
        subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
        bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
        cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)',
        contact: '0 1px 10px rgba(75, 90, 130, 0.1)',
        vendorCard: '0px 2px 3px rgba(0, 0, 0, 0.06)',
        vendorCardHover: '0px 1px 15px rgba(0, 0, 0, 0.06)',
        vendorSidebar:
          '0px 1px 2px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
