const express = require('express');
const K = require('./constants');
const fetch = require('node-fetch');

const sendHello = hostname => (req, res, next) => {
  Promise.all([
    fetch('http://api0')
      .then(response => response.json())
      .then(json => json),
    fetch('http://api1')
      .then(response => response.json())
      .then(json => json),
    fetch('http://api2')
      .then(response => response.json())
      .then(json => json)
  ])
  .then(responses => {
    res.send(`
    Hello from host: ${hostname}
    api hosts:
    ${responses.map(r => r.api).join(', ')}
    `)
  })
  .catch(next);
};

const sendApi = hostname => (req, res) => {
  res.json({'api': hostname});
};

module.exports = (config) => {
  const { ROLE, HOSTNAME } = config;
  const app = express();
  const sendHostNameHello = sendHello(HOSTNAME);
  const sendHostNameApi = sendApi(HOSTNAME);

  if (ROLE === K.API) {
    app.get('/', sendHostNameApi);
  }

  if (ROLE === K.HELLO) {
    app.get('/', sendHostNameHello);
  }

  if (
    ROLE === K.STATIC ||
    ROLE === K.HELLO
  ) {
    app.use(express.static('./src/static'));
  }

  return app;
};
