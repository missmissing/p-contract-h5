const mocks = ['./manageContract', './performance', './sign', './support', './process'];

module.exports = function (api) {
  mocks.forEach(function (mock) {
    require(mock)(api);
  });
};
