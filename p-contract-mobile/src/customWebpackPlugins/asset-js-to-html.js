class assetJsToHtml {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const paths = this.options.paths;
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        for (let i = 0; i < paths.length; i++) {
          htmlPluginData.assets.js.unshift(paths[i]);
        }
        callback(null, htmlPluginData);
      });
    });
  }
}


module.exports = assetJsToHtml;
