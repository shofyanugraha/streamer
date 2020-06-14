/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const vueLoader = require('vue-loader');
const path = require('path');

const transpileDependencies = [
  'regexpu-core',
  'strip-ansi',
  'ansi-regex',
  'ansi-styles',
  'react-dev-utils',
  'chalk',
  'unicode-match-property-ecmascript',
  'unicode-match-property-value-ecmascript',
  'acorn-jsx',
  '@znck[\\\\/]prop-types',
];

module.exports = {
  assetsDir: path.join(__dirname, 'public'),
  require: [path.join(__dirname, 'src/assets/style/main.scss')],
  title: 'Chat Stream',
  components: 'src/components/**/[A-Z]*.vue',
  defaultExample: true,
  getComponentPathLine(componentPath) {
    const componentFileName = path.basename(componentPath, '.vue');
    const name = componentFileName.toLowerCase() === 'index' ? path.basename(path.dirname(componentPath)) : componentFileName;
    return `import ${name} from '${componentPath.replace(/^src\//, '@')}'`;
  },
  version: '1.0.0',
  webpackConfig: {
    resolve: {
      alias: {
        '~': path.join(__dirname, './test'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: (modulePath) => (/node_modules/.test(modulePath) || /packages[\\/]vue-styleguidist[\\/]lib/.test(modulePath))
            && !transpileDependencies.some((mod) => new RegExp(`node_modules[\\\\/]${mod}[\\\\/]`).test(modulePath)),
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      ie: '11',
                    },
                  },
                ],
              ],
              comments: false,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },

    plugins: [new vueLoader.VueLoaderPlugin()].concat(
      process.argv.includes('--analyze') ? [new BundleAnalyzerPlugin()] : [],
    ),
  },
  usageMode: 'expand',
  exampleMode: 'expand',
  compilerConfig: {
    target: { ie: 11 },
  },
  styleguideDir: 'dist',
  displayOrigins: true,
  codeSplit: false,
};
