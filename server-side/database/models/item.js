'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SalesItems, {
        foreignKey: "item_id"
      });
    }
  };
  Item.init({
    nama_item: DataTypes.STRING,
    unit: DataTypes.ENUM("kg","pcs"),
    stok: DataTypes.STRING,
    harga_satuan: DataTypes.INTEGER,
    image_barang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Item;
};