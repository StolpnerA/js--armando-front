/* eslint-disable */

const express = require('express');
const serveStatic = require('serve-static');

app = express();

app.use(serveStatic(__dirname + "/dist"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log('server started '+ port);
