const customerRouter = require('express').Router();
const { getAllCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controller/customer-controller');

customerRouter.get("/customer", getAllCustomer);
customerRouter.post("/customer/new", createCustomer);
customerRouter.put("/customer/update", updateCustomer);
customerRouter.delete("/customer/delete", deleteCustomer);

module.exports = customerRouter;

