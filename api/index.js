require("pg");
var server = require('./src/app.js');
var sequelize = require('./src/db.js');

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    server.listen(3001, () => {
      console.log("Server listening on port 3001");
    });
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
}

startServer();