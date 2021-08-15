const { Customers } = require('../database/models');

exports.getAll = async() => {
  console.log(Customers);
  const allCustomer = await Customers.findAll();
  return allCustomer;
}

exports.create = async(data) => {
  console.log("ini data", data);
  const newCustomer = await Customers.create({
    nama: data.nama,
    contact: data.contact,
    email: data.email,
    alamat: data.alamat,
    diskon: data.diskon,
    tipe_diskon: data.tipe_diskon,
    ktp: data.ktp
  });  
  return newCustomer;
}

exports.findCustomer = async(email) => {
  const customer = await Customers.findOne({ 
    where: { email: email } 
  });
  return customer;
}

exports.update = async(data, payload) => {
  let updatedData =  {
    nama: payload.nama,
    contact: payload.contact,
    email: payload.email,
    alamat: payload.alamat,
    diskon: payload.diskon,
    tipe_diskon: payload.tipe_diskon,
    ktp: payload.ktp
  }
  const updatedCustomer = await Customers.update(updatedData, { where: { email: data.email } });
  return updatedData;
}

exports.delete = async(id) => {
  const deletedCustomer = await Customers.destroy({ where: {id: id} })
  return deletedCustomer; 
}