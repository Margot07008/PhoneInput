module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === 'production';

  const presets = [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    "@babel/preset-react",
    '@babel/preset-typescript',
    'babel-preset-mobx'
  ];
  const plugins = [
    !isProd && 'react-refresh/babel',
    [
      'react-css-modules',
      {
        'filetypes': {
          '.scss': {
            'syntax': 'postcss-scss',
            'plugins': ['postcss-nested']
          }
        },
        'generateScopedName': !isProd ? '[path][name]__[local]' : '[hash:base64]',
        'webpackHotModuleReloading': true,
        'autoResolveMultipleImports': true
      }
    ],
    '@babel/plugin-proposal-optional-chaining'
  ].filter(Boolean);

  return {
    presets,
    plugins
  }
}
