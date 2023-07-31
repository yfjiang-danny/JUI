// svgo.colorful.config.js
module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false, // Disable removeViewBox, otherwise it might get incorrect performance as change svg's size.
        },
      },
    },
    {
      name: "prefixIds",
    },
  ],
};
