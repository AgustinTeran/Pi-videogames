var {DataTypes} = require("sequelize")


module.exports = (s) => {
    s.define("plataforms",{
        name: {
            type: DataTypes.STRING
        }
    },{timestamps: false})
}