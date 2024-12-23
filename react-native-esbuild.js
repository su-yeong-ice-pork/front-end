/**
 * @type {import('@react-native-esbuild/core').Config}
 */
exports.default = {
  cache: true,
  logger: {
    disabled: false,
    timestamp: null,
  },
  resolver: {
    mainFields: ['react-native', 'browser', 'main', 'module'],
    sourceExtensions: [
      /* internal/lib/defaults.ts */
    ],
    assetExtensions: [
      /* internal/lib/defaults.ts */
    ],
  },
  transformer: {
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
    stripFlowPackageNames: ['react-native'],
  },
  web: {
    template: './template/index.html',
  },
};
