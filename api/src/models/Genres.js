var {DataTypes} = require("sequelize")


module.exports = (s) => {
    s.define("genres",{
        name: {
            type: DataTypes.STRING
        }
    },{timestamps: false})
}