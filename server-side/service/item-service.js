const { Op } = require('sequelize');
const { Items } = require('../database/models');

exports.getAll = async() => {
  const allItems = await Items.findAll();
  return allItems;
}

exports.create = async(data) => {
  const newItem = await Items.create({
    nama_item: data.nama_item,
    unit: data.unit,
    stok: data.stok,
    harga_satuan: data.harga_satuan,
    image_barang: data.image_barang,
  });
  return newItem;
}

exports.findItem = async(payload) => {
  const item = await Items.findOne({ 
    where: { nama_item: { [Op.like]: payload } } 
  });
  return item;
}

exports.findItemById = async(id) => {
  const item = await Items.findOne({ 
    where: { id: { [Op.eq]: id } } 
  });
  return item;
}

exports.update = async(data, id) => {
  let updatedData =  {
    nama_item: data.nama_item,
    unit: data.unit,
    stok: data.stok,
    harga_satuan: data.harga_satuan,
    image_barang: data.image_barang,
  }
  const updatedItem = await Items.update(updatedData, { where: { id: id } });
  return updatedItem;
}

exports.delete = async(id) => {
  const deletedItem = await Items.destroy({ where: {id: id} })
  return deletedItem; 
}