'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId'});
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId'})
    }
  }
  Booking.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    }, //added the id on booking make it as joint table.
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    startDate: {
      type:DataTypes.DATE,
      allowNull: false,

      validate :{
        isDate:true,
        // isBefore:this.endDate,


      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull:false,
      validate :{
        // isAfter: this.startDate,
        isafterenddate(value){
          if (value < this.startDate){
            throw new Error("endDate cannot be on or before startDate");
          }
        }

      }

    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
