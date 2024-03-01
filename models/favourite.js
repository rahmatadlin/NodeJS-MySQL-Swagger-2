'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Hero, { foreignKey: 'heroId' });
    }
  }
  Favourite.init(
    {
      heroId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      role: {
        type: DataTypes.STRING,
        defaultValue: '-',
      },
      power: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Favourite',
    }
  );

  return Favourite;
};