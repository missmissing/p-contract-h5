const api = require('./api');

const server = api.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://localhost', host, port);
});
