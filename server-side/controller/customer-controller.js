const customerService = require('../service/customer-service');

exports.getAllCustomer = async (req, res) => {
  try {
    const result = await customerService.getAll();
    res.status(200).json({
      statusText: "Ok",
      message: "Success Get All Customer",
      data: result,
    });     
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.createCustomer = async (req, res) => {
  try {
    const isCustomerExist = await customerService.findCustomer(req.body.email);
    if(isCustomerExist !== null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Customer Already Existed",
      });
    } else {
      console.log("ini", req.body);
      const newCustomer = await customerService.create(req.body);
      res.status(200).json({
        statusText: "Ok",
        message: "Success Add Customer",
        data: newCustomer,
      }); 
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    const isCustomerExist = await customerService.findCustomer(req.body.email);
    if(isCustomerExist === null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Customer Not Found",
      });
    }
    const updated = await customerService.update(isCustomerExist,req.body);
    res.status(200).json({
      statusText: "Ok",
      message: "Update Customer Success",
    }); 
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const isCustomerExist = await customerService.findCustomer(req.body.email);
    if(isCustomerExist === null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Customer Not Found",
      });
    }
    const deleted = await customerService.delete(isCustomerExist.id);
    res.status(200).json({
      statusText: "Ok",
      message: "Delete Customer Success",
    }); 
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}