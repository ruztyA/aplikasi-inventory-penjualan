const { Op, where } = require('sequelize');
const { Sales, Customers, SalesItems, Items } = require('../database/models');

exports.getAllSales = async() => {
  const allSales = await Sales.findAll();
  return allSales;
}

exports.getByDate = async(date) => {
  const allSales = await Sales.findAll({
    where: { tanggal_transaksi : { [Op.eq]: date } } 
  });
  return allSales;
}

exports.getByCustomer = async(id) => {
  const allSales = await Sales.findAll({
    where: { customer_id : { [Op.eq]: id } } 
  });
  return allSales;
}

exports.create = async(data) => {
  let error = null;
  let newSales;
  const customer = await Customers.findOne({
    attributes: ["id"],
    where: { email: data.cust_email },
  });
  if(customer) {
    newSales = await Sales.create({
      code_transaksi: data.code_transaksi,
      tanggal_transaksi: data.tanggal_transaksi,
      customer_id: customer.id,
    });    
  } else { error = "Customer not found"; }
  return {data: newSales, error};
}

exports.update = async(data, item) => {
  let items, harga = {};
  let array = [];
  for(let i = 0; i < item.length; i++){
    items = await SalesItems.create({
      sales_id: data.id,
      item_id: item[i].id,
      quantity: item[i].quantity,
    });
    harga[i] = await Items.findOne({
      attributes: ["harga_satuan"],  
      where: { id: item[i].id}, 
    });
    array.push(harga[i]);
  };

  let updatedQty;
  for(let i = 0; i < item.length; i++){
    updatedQty = await Items.findOne({ 
      where: {id: item[i].id} 
    });
    const reducedStock = parseInt(updatedQty.stok) - parseInt(item[i].quantity);
    const updatedData = {
      id: updatedQty.id,
      nama_item: updatedQty.nama_item,
      unit: updatedQty.unit,
      stok: reducedStock,
      harga_satuan: updatedQty.harga_satuan,
      image_barang: updatedQty.image_barang
    } 
    await Items.update(updatedData, {where: {id: updatedQty.id}});
  }

  let totalHarga =[];
  let total;
  for(let i = 0; i < array.length; i++){
    total = array[i].harga_satuan * parseInt(item[i].quantity);
    totalHarga.push(total);
  }
  totalHarga = totalHarga.reduce((a,b) => a + b);  

  const totalQty = item.map(x => x.quantity).reduce( (a,b) => parseInt(a) + parseInt(b));

  const diskon = await Customers.findOne({
    attributes: ["diskon", "tipe_diskon"],
    where: { id: data.customer_id }
  });

  let totalDiskon;
  if(diskon.tipe_diskon == "Persentase") {
    totalDiskon = (diskon.diskon)/100 * parseInt(totalHarga);
  } else {
    if(diskon.tipe_diskon == "Fix Diskon"){
      totalDiskon = diskon.diskon;
    };
  };

  const completedSales = {
    code_transaksi: data.code_transaksi,
    tanggal_transaksi: data.tanggal_transaksi,
    customer_id: data.customer_id,
    sales_items_id: items.id,
    total_quantity: totalQty,
    total_diskon: totalDiskon,
    total_harga: totalHarga,
    total_bayar: totalHarga - totalDiskon
  };

  const updatedSales = await Sales.update(completedSales, {where: { id: data.id }})
  const result = await Sales.findOne({where: {id: data.id}});

  return result;
};

exports.delete = async(id) => {
  const deletedSales = await Sales.destroy({ where: {id: id} })
  return deletedSales; 
}

exports.findSales = async(payload) => {
  const sales = await Sales.findOne({
    where: { code_transaksi : { [Op.eq]: payload } } 
  })
  return sales;
}