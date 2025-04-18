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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.

  server.listen(3001, async() => {
    
    try {
      await conn.sync({ alter: true })
      
       // eslint-disable-line no-console
       console.log("Conection to the database sussessfully");
       
    } catch (error) {
      console.error("Error trying to connect to the database",error); // eslint-disable-line no-console
    }

    console.log('%s listening at 3001');
  });

