// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// storybook v5 export requires function, not an object
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.jsx?$/,
    use: "babel-loader",
    exclude: /node_modules/,
  });

  return config;
};
