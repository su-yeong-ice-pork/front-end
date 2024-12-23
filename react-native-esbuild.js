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
    stripFlowPackageNames: ['react-native', 'react-native-video'],
  },
  additionalTransformRules: {
    babel: [
      {
        test: (path, code) => {
          return (
            /node_modules\/react-native-reanimated\//.test(path) ||
            code.includes('react-native-reanimated')
          );
        },
        options: {
          plugins: ['react-native-reanimated/plugin'],
          babelrc: false,
        },
      },
    ],
  },
  web: {
    template: '<path to default template>',
  },
};
