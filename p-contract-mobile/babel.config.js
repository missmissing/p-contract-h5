module.exports = (config) => {
  config.plugins.push(['component',
    [{
      libraryName: 'element-ui',
      styleLibraryName: 'theme-default'
    },
    {
      libraryName: 'mint-ui',
      style: true
    }]
  ], 'lodash');
  return config;
};

