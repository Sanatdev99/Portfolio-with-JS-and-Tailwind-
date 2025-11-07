module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  safelist: [
    'translate-x-[-200px]',
    'translate-x-[200px]',
    'translate-x-[-50px]',
    'translate-x-0',
    'translate-y-0',
    'translate-y-20',
    'scale-90',
    'scale-100',
    'opacity-0',
    'opacity-100',
  ],
  theme: { extend: {} },
  plugins: [],
};
