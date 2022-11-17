require('dotenv').config();
const { Sequelize, Op} = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  D_Host,D_Pass,D_User,DEPLOY_HOST,DEPLOY_USERNAME,DEPLOY_PASSWORD
} = process.env;


const sequelize = new Sequelize({
  database: "d12amqem5ik0vu",
  dialect: "postgres",
  host: `${DEPLOY_HOST}`,
  port: "5432",
  username: `${DEPLOY_USERNAME}`,
  password: `${DEPLOY_PASSWORD}`,
  logging: false,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
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


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genres, Plataforms } = sequelize.models;

Videogame.belongsToMany(Genres,{through: "games_genres"})
Genres.belongsToMany(Videogame,{through: "games_genres"})

Videogame.belongsToMany(Plataforms,{through: "games_plataforms"})
Plataforms.belongsToMany(Videogame,{through: "games_plataforms"})
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
