'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Items, {
        foreignKey: "item_id",
      });
      this.belongsTo(models.Sales, {
        foreignKey: "sales_id",
      });
      this.hasMany(models.Sales, {
        foreignKey: "sales_items_id",
      })
    }
  };
  SalesItems.init({
    sales_id: {
      references: {
        model: "Sales",
        key: "id",
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      references: {
        model: "Items",
        key: "id",
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalesItems',
  });
  return SalesItems;
};