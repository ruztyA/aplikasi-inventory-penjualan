'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customers, {
        foreignKey: "customer_id",
      });
      this.hasMany(models.SalesItems, {
        foreignKey: "sales_id"
      });
      this.belongsTo(models.SalesItems, {
        foreignKey: "sales_items_id"
      })
      
    }
  };
  Sales.init({
    code_transaksi: DataTypes.STRING,
    tanggal_transaksi: DataTypes.DATE,
    customer_id: {
      references: {
        model: "Customers",
        key: "id",
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    sales_items_id: DataTypes.INTEGER,
    total_quantity: DataTypes.STRING,
    total_diskon: DataTypes.INTEGER,
    total_harga: DataTypes.INTEGER,
    total_bayar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};