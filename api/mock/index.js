const mocks = ['./manageContract', './performance', './sign', './support'];

module.exports = function (api) {
  mocks.forEach(function (mock) {
    require(mock)(api);
  });
};
