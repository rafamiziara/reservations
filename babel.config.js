module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",
          "@models": "./src/models",
          "@repositories": "./src/repositories/implementations",
          "@errors": "./src/errors",
          "@IRepositories": ".src/repositories",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
