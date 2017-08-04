const mocks = ['./create', './performance', './sign', './template'];

module.exports = function (api) {
  mocks.forEach(function (mock) {
    require(mock)(api);
  });
};
