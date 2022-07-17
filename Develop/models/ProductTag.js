const { Model, DataTypes, INTEGER } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {"product",
      key: "id"
    }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {'tag',
      key: 'id'
    }
    },
    //!! seeds won't work until defined
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
