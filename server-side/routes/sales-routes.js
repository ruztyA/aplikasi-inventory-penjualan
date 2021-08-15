const salesRouter = require('express').Router();
const { getAllSales, getByDate, getByCust, createSales, deleteSales } = require('../controller/sales-controller');

salesRouter.get("/sales", getAllSales);
salesRouter.post("/sales/date", getByDate);
salesRouter.get("/sales/:cust_id", getByCust);
salesRouter.post("/sales/new", createSales);
salesRouter.delete("/sales/delete", deleteSales);

module.exports = salesRouter;

