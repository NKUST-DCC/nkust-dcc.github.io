module.exports = {
  purge: ["./layouts/**/*.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // https://github.com/tailwindlabs/tailwindcss/discussions/1361
      colors: {
        inherit: "inherit",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
