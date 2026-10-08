/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        './vendor/awcodes/filament-tiptap-editor/resources/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    50: "#f1f9fa",
                    100: "#daeff3",
                    200: "#badee7",
                    300: "#8ac6d6",
                    400: "#53a6bd",
                    500: "#388aa2",
                    600: "#33758f",
                    700: "#2d5c71",
                    800: "#2c4e5e",
                    900: "#a4a3a3",
                    950: "#162a36",
                    DEFAULT: "#33758f", // 600 IS DEFAULT
                },
                "warning": {
                    50: "#fffaf3",
                    100: "#fef2c9",
                    200: "#fdeca0",
                    300: "#fcd576",
                    400: "#fbcf47",
                    500: "#f9b90a",
                    600: "#d49a08",
                    700: "#b17c07",
                    800: "#8f5f06",
                    900: "#754a05",
                    DEFAULT: "#fbcf47", // 400 IS DEFAULT
                },
                "success": {
                    50: "#f3faf6",
                    100: "#d5f2e3",
                    200: "#a9e7cd",
                    300: "#6fd9b3",
                    400: "#3fcf9b",
                    500: "#1abf7f",
                    600: "#0e9f64",
                    700: "#0a8050",
                    800: "#08643e",
                    900: "#074b31",
                    DEFAULT: "#3fcf9b", // 400 IS DEFAULT
                },
                "danger" : {
                    50: "#fff3f3",
                    100: "#fddcdc",
                    200: "#fca3a3",
                    300: "#f86b6b",
                    400: "#f53f3f",
                    500: "#f00",
                    600: "#d40000",
                    700: "#b30000",
                    800: "#910000",
                    900: "#750000",
                    DEFAULT: "#f53f3f", // 400 IS DEFAULT
                },
                "accent-gray": { // Previously "accent-gray"
                    50: "#f9f9f9",
                    100: "#e0e0e0",
                    200: "#bdbdbd",
                    300: "#9e9e9e",
                    400: "#757575",
                    500: "#616161",
                    600: "#424242",
                    700: "#333333",
                    800: "#2b2b2b",
                    900: "#212121",
                    950: "#121212",
                    DEFAULT: "#cccccc80", // 600 IS DEFAULT
                },
                "accent-red": { // Previously "accent-red"
                    50: "#fff5f5",
                    100: "#fedad6",
                    200: "#fbb5b5",
                    300: "#f98e8e",
                    400: "#f3686b",
                    500: "#ef4444",
                    600: "#dc2626",
                    700: "#b91c1c",
                    800: "#991b1b",
                    900: "#7f1d1d",
                    950: "#591717",
                    DEFAULT: "#f3686b", // 400 IS DEFAULT
                },
            },
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1440px',
            // => @media (min-width: 1536px) { ... }
          }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar'),
    ],
  };
  