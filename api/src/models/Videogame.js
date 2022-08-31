const { DataTypes,UUIDV4,Sequelize } = require('sequelize');
// var s = new Sequelize()

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    background_image:{
      type: DataTypes.TEXT,
      unique: true
    },
    released: {
      type: DataTypes.DATEONLY,
      defaulfValue: DataTypes.NOW,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    }
  },{timestamps: false});
};
