const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    if (!options.isServer) {
      const mfeReactUrl =
        process.env.NEXT_PUBLIC_MFE_REACT_URL || "http://localhost:3001";
      const mfeVueUrl =
        process.env.NEXT_PUBLIC_MFE_VUE_URL || "http://localhost:3002";
      const mfeAngularUrl =
        process.env.NEXT_PUBLIC_MFE_ANGULAR_URL || "http://localhost:3003";

      config.plugins.push(
        new NextFederationPlugin({
          name: "shell",
          remotes: {
            mfe_react: `mfe_react@${mfeReactUrl}/assets/remoteEntry.js`,
            mfe_vue: `mfe_vue@${mfeVueUrl}/assets/remoteEntry.js`,
            mfe_angular: `mfe_angular@${mfeAngularUrl}/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",
          shared: {},
          extraOptions: {
            skipSharingNextInternals: false,
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
