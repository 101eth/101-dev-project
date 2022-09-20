module.exports = {
  theme: {
    keyframes: {
      "fade-in-down": {
        "0%": {
          opacity: "0",
          transform: "translateY(-10px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "fade-out-down": {
        "0%": {
          opacity: "1",
          transform: "translateY(0px)",
        },
        "100%": {
          opacity: "0",
          transform: "translateY(10px)",
        },
      },
      "fade-in-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(10px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "fade-out-up": {
        from: {
          opacity: "1",
          transform: "translateY(0px)",
        },
        to: {
          opacity: "0",
          transform: "translateY(10px)",
        },
      },
      "checkmark-in": {
        "0%": {
          height: 0,
          width: 0,
          opacity: 0,
        },
        "40%": {
          height: 0,
          width: "1.5rem",
          opacity: 1,
        },
        "100%": {
          opacity: 1,
          height: "1.5rem",
        },
      },
      shake: {
        "10%, 90%": {
          transform: "translate3d(-2px, 0, 0)",
        },

        "20%, 80%": {
          transform: "translate3d(4px, 0, 0)",
        },

        "30%, 50%, 70%": {
          transform: "translate3d(-6px, 0, 0)",
        },

        "40%, 60%": {
          transform: "translate3d(6px, 0, 0)",
        },
      },
      spinner: {
        "0%": {
          transform: "rotate(0deg)",
        },

        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      spin: "spin 1s linear infinite",
      "fade-in-down": "fade-in-down 0.5s ease",
      "fade-out-down":
        "fade-out-down 0.4s forwards cubic-bezier(.06,.71,.55,1)",
      "fade-in-up": "fade-in-up 0.35s cubic-bezier(.21,1.02,.73,1) forwards",
      "fade-out-up": "fade-out-up 0.5s ease",
      "checkmark-in": "checkmark-in 0.2s ease-out forwards",
      shake: "shake 0.3s cubic-bezier(.36,.07,.19,.97) both",
      loader: "spinner 0.65s linear infinite",
    },
    fontFamily: {
      rhd: ["Red Hat Display", "sans-serif"],
      header: ["Space Mono", "sans-serif"],
      sans: ["PlusJakartaSans", "sans-serif"],
      body: ["PlusJakartaSans", "sans-serif"],
    },
    fontSize: {
      "3xs": ["0.75rem", "1rem"],
      "2xs": ["0.875rem", "1.25rem"],
      xs: ["1rem", "1.25rem"],
      s: ["1.25rem", "1.75rem"],
      sm: ["1.25rem", "1.75rem"],
      m: ["1.5rem", "2rem"],
      base: ["1.5rem", "2rem"],
      l: ["2rem", "2.5rem"],
      lg: ["2rem", "2.5rem"],
      xl: ["2.25rem", "2.75rem"],
      "2xl": ["3rem", "3.875rem"],
      "3xl": ["3.5rem", "4.5rem"],
    },
    maxWidth: {
      1500: "1500px",
    },
  },
  extends: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      gold: {
        50: "#fcf9ed",
        100: "#FFDD68",
        200: "#EE8479",
        300: "#EC6655",
        400: "#EDB800",
        500: "#C49800",
        600: "#A58000",
        650: "#9F7104",
        700: "#975E09",
        800: "#685100",
        900: "#4A3900",
      },
      primary: {
        pink: {
          100: "#FBE7F0",
          200: "#F7CEE1",
          300: "#F19EC3",
          400: "#EB488A",
          500: "#EA336F",
          600: "#BB2759",
          700: "#8C1A42",
          800: "#5D0E2C",
          900: "#2E0416",
          1000: "#16010B",
        },
        blue: {
          100: "#ECF1FE",
          200: "#D9E2FC",
          300: "#A1B8F9",
          400: "#141621",
          500: "#4671F6",
          600: "#385AC5",
          700: "#23387B",
          800: "#142249",
          900: "#0E1731",
          1000: "#060B18",
        },
      },
      grey: {
        100: "#E8E8EA",
        200: "#D1D2D5",
        300: "#A3A4AA",
        400: "#8C8E96",
        500: "#5E606C",
        600: "#313342",
        700: "#1A1C2D",
        800: "#141624",
        900: "#0F111B",
        1000: "#0A0B11",
      },
      success: {
        100: "#EFF6EA",
        200: "#DDEBD5",
        300: "#ACCF98",
        400: "#7DB15D",
        500: "#5F9E3B",
        600: "#4C7E2F",
        700: "#395F22",
        800: "#253F16",
        900: "#12200A",
        1000: "#091005",
      },
      warning: {
        100: "#FEF7E9",
        200: "#FBEED2",
        300: "#F5CF7E",
        400: "#F3BF59",
        500: "#F0AE40",
        600: "#C08C32",
        700: "#906924",
        800: "#483410",
        900: "#302308",
        1000: "#181104",
      },
      error: {
        100: "#F4E8E9",
        200: "#E8D1D3",
        300: "#C78E91",
        400: "#A84C50",
        500: "#952727",
        600: "#771E1F",
        700: "#4B1214",
        800: "#2C0A0B",
        900: "#1E0608",
        1000: "#0E0203",
      },
      "black-blur": "rgba(0,0,0,0.4)",
      "opaque-black": "rgba(0,0,0,0.7)",
    },
  },
};
