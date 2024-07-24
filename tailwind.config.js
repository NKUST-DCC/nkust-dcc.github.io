// tailwind doesn't quote fonts for you...
let cjkFallback = [
  "'Noto Sans CJK TC'",
  "'Microsoft Jhenghei'",
  "'Microsoft Yahei'",
  "Meiryo",
  "'Malgun Gothic'",
];

module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["'M PLUS 1p'", ...cjkFallback, "sans-serif"],
    },
    extend: {
      fontSize: {
        xs: ["12px", { lineHeight: "1rem" }],
        sm: ["14px", { lineHeight: "1.25rem" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["20px", { lineHeight: "1.4" }],
        xl: ["24px", { lineHeight: "1.4" }],
        "2xl": ["28px", { lineHeight: "2" }],
        "3xl": ["32px", { lineHeight: "2.25rem" }],
        "4xl": ["36px", { lineHeight: "2.5rem" }],
        "5xl": ["40px", { lineHeight: "1" }],
        "6xl": ["44px", { lineHeight: "1" }],
        "7xl": ["48px", { lineHeight: "1" }],
        "8xl": ["52px", { lineHeight: "1" }],
        "9xl": ["64px", { lineHeight: "1" }],
      },
      boxShadow: {
        DEFAULT: "0 0 0.5rem #00000070",
        md: "0 0 1rem #00000070",
        white: "0 0 0.5rem #f8f6f7",
      },
      outline: {
        a: "0.25rem solid #b16154",
      },
      // https://github.com/tailwindlabs/tailwindcss/discussions/1361
      colors: {
        inherit: "inherit",
        a: "#e1c2bd",
        "a-500": "#b16154",
        "a-900": "#552d27",
        b: "#91d6c3",
        "b-dark": "#38967c",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
