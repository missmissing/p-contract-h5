module.exports = (config) => {
  config.plugins.push(['component',
    [
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      {
        libraryName: 'mint-ui',
        style: true
      }
    ]
  ], 'lodash', 'syntax-dynamic-import');

  config.presets[0][1].targets.browsers.push('iOS >= 7', 'Android >= 4.1');
  return config;
};

