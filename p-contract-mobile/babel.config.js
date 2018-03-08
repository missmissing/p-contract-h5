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

// module.exports = () => {
//   const config = {
//     babelrc: false,
//     compact: false,
//     cacheDirectory: true,
//     presets: [
//       [
//         'env',
//         {
//           modules: false,
//           targets: {
//             browsers: [
//               '> 1%',
//               'last 2 versions',
//               'Firefox ESR',
//               'ie >= 9',
//               'iOS >= 7',
//               'Android >= 4.1'
//             ]
//           },
//           useBuiltIns: 'usage'
//         }
//       ]
//     ],
//     plugins: ['transform-object-rest-spread', ['component',
//       [
//         {
//           libraryName: 'element-ui',
//           styleLibraryName: 'theme-chalk'
//         },
//         {
//           libraryName: 'mint-ui',
//           style: true
//         }
//       ]
//     ], 'syntax-dynamic-import']
//   };
//
//   return config;
// };

