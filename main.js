const server = require('./src/server');

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Listening on ${hostname}:${port}`);
});
