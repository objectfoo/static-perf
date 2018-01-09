const app = require('./app');
const K = require('constants');

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const ROLE = process.env.ROLE || K.HELLO;
const HOSTNAME = process.env.HOSTNAME || 'no host';

if (
  PORT === undefined ||
  HOST === undefined
) {
  throw new Error('process.env.PORT and process.env.HOST are required');
}

const server = app({
    ROLE,
    HOSTNAME
    }
);

server.listen(PORT, HOST, () => {
  console.log(`${ROLE} Server started: ${HOST}:${PORT}`);
});
