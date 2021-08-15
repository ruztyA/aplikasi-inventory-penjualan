const itemRouter = require('express').Router();
const { getAllItem, createItem, updateItem, deleteItem } = require('../controller/item-controller');

itemRouter.get("/items", getAllItem);
itemRouter.post("/items/new", createItem);
itemRouter.put("/items/update", updateItem);
itemRouter.delete("/items/delete", deleteItem);

module.exports = itemRouter;

