const api = require('./api');
//api.use(express.static('./dist'));

const server = api.listen(3000, function (req, res) {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
