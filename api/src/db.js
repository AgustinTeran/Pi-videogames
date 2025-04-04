require('dotenv').config();
const { Sequelize, Op} = require('sequelize');
// const fs = require('fs');
// const path = require('path');
const {
  D_Host,D_Pass,D_User,D_Database
} = process.env;


const sequelize = new Sequelize({
  database: `${D_Database}`,
  dialect: "postgres",
  dialectModule: require('pg'),
  host: `${D_Host}`,
  port: "5432",
  username: `${D_User}`,
  password: `${D_Pass}`,
  logging: false,
  pool: {
    max: 10,
    // acquire: 45000, // Tiempo máximo de espera antes de fallar la conexión
    // idle: 1000, // Tiempo máximo de inactividad antes de cerrar la conexión
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
});


// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);
require("../src/models/Videogame")(sequelize);
require("../src/models/plataforms")(sequelize);
require("../src/models/Genres")(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
var { videogame, genres, plataforms } = sequelize.models;

videogame.belongsToMany(genres,{through: "games_genres"})
genres.belongsToMany(videogame,{through: "games_genres"})

videogame.belongsToMany(plataforms,{through: "games_plataforms"})
plataforms.belongsToMany(videogame,{through: "games_plataforms"})
// Aca vendrian las relaciones
// Product.hasMany(Reviews);



module.exports = sequelize
