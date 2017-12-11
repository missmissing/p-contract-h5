module.exports = function (config) {
  config.plugins.push(['component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-default'
    }
  ]);
  return config;
};

