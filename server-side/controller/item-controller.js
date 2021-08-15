const itemService = require('../service/item-service');

exports.getAllItem = async (req, res) => {
  try {
    const result = await itemService.getAll();
    res.status(200).json({
      statusText: "Ok",
      message: "Success Get All Item",
      data: result,
    });     
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.createItem = async (req, res) => {
  try {
    const isItemExist = await itemService.findItem(req.body.nama_item);
    if(isItemExist !== null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Item Already Existed",
      });
    } else {
      const newItem = await itemService.create(req.body);
      res.status(200).json({
        statusText: "Ok",
        message: "Success Create Item",
        data: newItem,
      });
    } 
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.updateItem = async (req, res) => {
  try {
    const isItemExist = await itemService.findItemById(req.body.id);
    if(isItemExist === null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Item Not Existed",
      });
    } else {
      const updated = await itemService.update(req.body, isItemExist.id);
      res.status(200).json({
        statusText: "Ok",
        message: "Update Item Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const isItemExist = await itemService.findItem(req.body.nama_item);
    if(isItemExist === null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Item Not Existed",
      });
    }
    const deleted = await itemService.delete(isItemExist.id);
    res.status(200).json({
      statusText: "Ok",
      message: "Delete Item Success",
    }); 
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}