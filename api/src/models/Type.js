const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// Defino el modelo
    sequelize.define('Type', {
        name: {
        type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true // Para evitar la auto-pluralizacion de los modelos.
    });
};