//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("pg")
var server = require('./src/app.js');
var sequelize = require('./src/db.js');

async function databaseSync() {
  try {
    console.log("connecting to database");
    
    await sequelize.sync({alter: false})

    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

databaseSync();



server.listen(3001,() => {

  console.log("server listening on port 3001");
 
})