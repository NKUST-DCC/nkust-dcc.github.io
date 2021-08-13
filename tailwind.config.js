let cjkFallback = [
  "Noto Sans CJK TC",
  "Microsoft Jhenghei",
  "Microsoft Yahei",
  "Meiryo",
  "Malgun Gothic",
];

module.exports = {
  purge: ["./layouts/**/*.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["M PLUS 1p", ...cjkFallback, "sans-serif"],
      // serif: ["Equity"],
    },
    extend: {
      // https://github.com/tailwindlabs/tailwindcss/discussions/1361
      colors: {
        inherit: "inherit",
        a: "#e1c2bd",
        b: "#91d6c3",
        white: "#f8f6f7",
        black: "#000000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
