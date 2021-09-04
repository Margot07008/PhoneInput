const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html')
  }),
  !isProd && new ReactRefreshWebpackPlugin(),
  new MiniCssExtractPlugin(
    {
      filename: '[name]-[hash].css'
    }
  ),
  !isProd && new ForkTsCheckerPlugin()
].filter(Boolean);

const getCssRules = (withModules) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: withModules && {
          localIdentName: '[path][name]__[local]'
        },
        importLoaders: 1,
        sourceMap: false
      }
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            'autoprefixer'
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [srcPath]
        }
      }
    }
  ]
}

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    path: buildPath,
    filename: '[name].[contenthash].js',
  },
  target: isProd ? "browserslist" : "web",
  optimization: isProd ? {
    minimize: true,
    minimizer: [new TerserPlugin({parallel: true})],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  } : {},
  module: {
    rules: [
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.modules.s?css$/,
        use: getCssRules(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.modules.s?css$/,
        use: getCssRules(false)
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        }
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    alias: {
      components: `${srcPath}/components`,
      scss: `${srcPath}/scss`,
      App: `${srcPath}/App`,
      shared: `${srcPath}/shared`,
      stores: `${srcPath}/stores`
    }
  },
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    inline: true
  }
}
