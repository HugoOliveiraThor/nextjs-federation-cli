/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  // Disable Next.js cache in development
  productionBrowserSourceMaps: true, // Why disabled : sometimes when trying to refresh the page we receive erros from cache removed.
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "menu", //TODO: Change to name of the repo without camelCase
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./component/Mycomponent": "./src/components/MyComponent",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};