function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components-saas/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/lib-saas/**/*.{js,ts,jsx,tsx}',
    './src/pages/get-started/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1900px',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
        heading: ['Lato', 'system-ui', 'sans-serif'],
        Source_Serif_Pro: ['Source Serif Pro', 'serif'],
        // display: ['Oswald', ...],
      },
      fontSize: {
        12: ['12px'],
        16: ['16px'],
        20: ['20px'],
        32: ['32px'],
        '2xl': ['1.75rem'],
      },
      colors: {
        light: '#ffffff',
        dark: '#000000',
        accent: '#169968',
        'accent-hover': '#098255',
        'accent-300': withOpacity('--color-accent-300'),
        'accent-400': withOpacity('--color-accent-400'),
        'accent-500': withOpacity('--color-accent-500'),
        'accent-600': withOpacity('--color-accent-600'),
        'accent-700': withOpacity('--color-accent-700'),
        'border-50': withOpacity('--color-border-50'),
        'border-100': withOpacity('--color-border-100'),
        'border-200': withOpacity('--color-border-200'),
        'border-base': withOpacity('--color-border-base'),
        'border-400': withOpacity('--color-border-400'),
        'gray-50': withOpacity('--color-gray-50'),
        'gray-100': withOpacity('--color-gray-100'),
        'gray-200': withOpacity('--color-gray-200'),
        'gray-300': withOpacity('--color-gray-300'),
        'gray-400': withOpacity('--color-gray-400'),
        'gray-500': withOpacity('--color-gray-500'),
        'gray-600': withOpacity('--color-gray-600'),
        'gray-700': withOpacity('--color-gray-700'),
        'gray-800': withOpacity('--color-gray-800'),
        'gray-900': withOpacity('--color-gray-900'),
        'theme-1': '#1C8C64',
        social: {
          facebook: '#3b5998',
          'facebook-hover': '#35508a',
          twitter: '#1da1f2',
          instagram: '#e1306c',
          youtube: '#ff0000',
          google: '#4285f4',
          'google-hover': '#3574de',
        },
      },

      textColor: {
        body: withOpacity('--text-base'),
        'body-dark': withOpacity('--text-base-dark'),
        muted: withOpacity('--text-muted'),
        'muted-light': withOpacity('--text-muted-light'),
        heading: withOpacity('--text-heading'),
        'sub-heading': withOpacity('--text-sub-heading'),
        bolder: withOpacity('--text-text-bolder'),
      },

      height: {
        13: '3.125rem',
        double: '200%',
      },
      maxWidth: {
        5: '1.25rem',
      },
      maxHeight: {
        5: '1.25rem',
      },
      spacing: {
        22: '5.5rem',
      },

      borderRadius: {
        DEFAULT: '5px',
      },

      boxShadow: {
        base: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',
      },
      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))',
      },
      // screens: {
      //   xs: '475px',
      //   // => @media (min-width: 475px) { ... }
      //   sm: '640px',
      //   // => @media (min-width: 640px) { ... }

      //   md: '768px',
      //   // => @media (min-width: 768px) { ... }

      //   lg: '1024px',
      //   // => @media (min-width: 1024px) { ... }

      //   xl: '1280px',
      //   // => @media (min-width: 1280px) { ... }

      //   '2xl': '1536px',
      //   // => @media (min-width: 1536px) { ... }
      // },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
      borderWidth: ['last', 'focus'],
      margin: ['last', 'first'],
      padding: ['last', 'first'],
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
