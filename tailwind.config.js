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
      // serif: ["Equity"],
    },
    extend: {
      fontSize: {
        xs: ["12pt", { lineHeight: "1rem" }],
        sm: ["14pt", { lineHeight: "1.25rem" }],
        base: ["16pt", { lineHeight: "1.6" }],
        lg: ["20pt", { lineHeight: "1.4" }],
        xl: ["24pt", { lineHeight: "1.4" }],
        "2xl": ["28pt", { lineHeight: "2" }],
        "3xl": ["32pt", { lineHeight: "2.25rem" }],
        "4xl": ["36pt", { lineHeight: "2.5rem" }],
        "5xl": ["40pt", { lineHeight: "1" }],
        "6xl": ["44pt", { lineHeight: "1" }],
        "7xl": ["48pt", { lineHeight: "1" }],
        "8xl": ["52pt", { lineHeight: "1" }],
        "9xl": ["64pt", { lineHeight: "1" }],
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
