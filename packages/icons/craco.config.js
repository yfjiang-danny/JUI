/**
 * craco.config.js
 *
 * Overwrite webpack config
 */

const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules[1].oneOf = [
        // oneOf indicate that rule match only one time.
        ...[
          {
            test: /\.svg$/,
            include: [path.resolve("src/icons/src/normal")],
            use: [
              {
                loader: "svg-sprite-loader",
                options: {},
              },
              "svgo-loader",
            ],
          },
          {
            test: /\.svg$/,
            include: [path.resolve("src/icons/src/colorful")],
            use: [
              { loader: "svg-sprite-loader", options: {} },
              {
                loader: "svgo-loader",
                options: {
                  configFile: path.resolve("svgo.colorful.config.js"),
                },
              },
            ],
          },
        ],
        ...webpackConfig.module.rules[1].oneOf,
      ];

      return webpackConfig;
    },
  },
};

// export default config;
