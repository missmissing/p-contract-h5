module.exports = (conf) => {
  const config = conf;
  if (!config.externals) {
    config.externals = {};
  }
  Object.assign(config.externals, {vue: 'Vue'});

  return config;
};
