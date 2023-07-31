// svgo.config.js
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
    {
      name: "removeAttrs", // Remove fill attr
      params: {
        attrs: "fill",
      },
    },
    {
      name: "addAttributesToSVGElement", // Add fill's value to be currentColor so we can change svg's color through style.color/class.color
      params: {
        attributes: [
          {
            fill: "currentColor",
          },
        ],
      },
    },
  ],
};
