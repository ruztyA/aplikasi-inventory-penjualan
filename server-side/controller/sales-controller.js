const salesService = require('../service/sales-service');

exports.getAllSales = async (req, res) => {
  try {
    const result = await salesService.getAllSales();
    res.status(200).json({
      statusText: "Ok",
      message: "Success Get All Sales",
      data: result,
    });     
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.getByDate = async (req, res) => {
  try {
    const result = await salesService.getByDate(req.body.tanggal_transaksi);
    res.status(200).json({
      statusText: "Ok",
      message: "Success Get All Sales",
      data: result,
    });     
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.getByCust = async (req, res) => {
  try {
    const result = await salesService.getByCustomer(req.params.cust_id);
    res.status(200).json({
      statusText: "Ok",
      message: "Success Get All Sales",
      data: result,
    });     
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.createSales = async (req, res) => {
  try {
    const isSalesExist = await salesService.findSales(req.body.code_transaksi);
    if(isSalesExist !== null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Sales Already Existed",
      });
    } else {
      const {data: newSales, error} = await salesService.create(req.body);
      if(error !== null){
        res.status(400).json({
          statusText: "Bad Request",
          message: "Customer Not Found",
        });
      } else {
        const result = await salesService.update(newSales, req.body.items)
        res.status(200).json({
          statusText: "Ok",
          message: "Success Create Sales",
          data: result,
        });
      }
    }
  } catch (error) {
    console.log("🦄 ~ file: sales-controller.js ~ line 75 ~ exports.createSales= ~ error", error)
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}

exports.deleteSales = async (req, res) => {
  try {
    const isSalesExist = await salesService.findSales(req.body.code_transaksi);
    if(isSalesExist === null) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Sales Not Found",
      });
    }

    const deleted = await salesService.delete(isSalesExist.id);
    res.status(200).json({
      statusText: "Ok",
      message: "Delete Sales Success",
    }); 
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
}