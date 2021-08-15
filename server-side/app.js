require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const server = express();
const port = process.env.PORT || 3000;

const customerRoute = require('./routes/customer-routes');
const itemRoute = require('./routes/items-routes');
const salesRoute = require('./routes/sales-routes');

server.use(logger('dev'));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.get('/', (req, res) => {
  res.send('Aplikasi Inventory Penjualan');
});

server.use("/api", customerRoute);
server.use("/api", itemRoute);
server.use("/api", salesRoute);

server.all('*', (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You have trying to reach an invalid route",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

