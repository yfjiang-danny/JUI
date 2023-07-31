// .svgrrc.js

const svgoConfig = require("./svgo.colorful.config.js");

module.exports = {
  typescript: true,
  icon: true,
  ref: true,
  expandProps: true,
  filenameCase: "pascal",
  svgoConfig: svgoConfig,
};

// export default config;
