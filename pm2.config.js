module.exports = {
  apps: [
    {
      name: "api",
      script: "dist/api.js",
      node_args: "--experimental-modules",
    },
  ],
};
