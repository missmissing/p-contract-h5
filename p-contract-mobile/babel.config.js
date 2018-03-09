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
  ])
  return config
}
