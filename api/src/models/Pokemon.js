const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// Defino el modelo
  sequelize.define('Pokemon', {
      id: {
        type: DataTypes.UUID, //UUID genera numero random con letras y numeros, va a ser unico e irrepetible.
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //Dato obligatorio.
        primaryKey: true // Refiere a que "id" sera la clave primaria.
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("poison", "rock", "water", "dragon", "flying", "ghost", "electric", "fairy", "normal", "steel", "ice", "shadow", "fighting", "fire", "psychic", "unknown", "ground", "bug", "grass", "dark"),
        // allowNull: false,
      },
      selfMade: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    }, {
      freezeTableName: true
  });
};
