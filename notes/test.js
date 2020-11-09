const http = require('http');
const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Express 101');
});

const server = http.createServer(app);

const addr = server.address();

console.log(addr);