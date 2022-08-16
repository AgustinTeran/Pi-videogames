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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
      defaulfValue: DataTypes.NOW,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    },
    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },{timestamps: false});
};
