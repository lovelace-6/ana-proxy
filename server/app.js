const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(morgan('dev'));

const staticPath = `${__dirname}/../public`;
app.use('/books/:id', express.static(staticPath));

app.get('/loaderio-b87874e42d8ab66f4d2efca86fe6401d', (req, res) => res.sendFile(path.resolve(`${__dirname}/../loaderio-key.txt`)));

app.use(
  '/books/:id/details',
  proxy({ target: 'http://ec2-18-191-160-157.us-east-2.compute.amazonaws.com:3001', changeOrigin: true }),
);

app.use(
  '/books/details',
  proxy({ target: 'http://ec2-18-191-160-157.us-east-2.compute.amazonaws.com:3001', changeOrigin: true }),
);

// hannah-service
app.use(
  '/books/:id/reviews',
  proxy({ target: 'http://ec2-18-224-40-87.us-east-2.compute.amazonaws.com:3003', changeOrigin: true }),
);

// kaz-service
// app.use(
//   '/books/:id/info',
//   proxy({ target: 'http://localhost:3002', changeOrigin: true }),
// );

// ginger-service
app.use(
  '/books/:id/authors',
  proxy({ target: 'http://ec2-13-59-83-138.us-east-2.compute.amazonaws.com:9000', changeOrigin: true }),
);

module.exports = app;
