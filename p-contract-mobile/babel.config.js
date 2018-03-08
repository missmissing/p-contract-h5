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
  return config;
};

