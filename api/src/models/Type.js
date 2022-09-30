const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Type', {
        name: {
            type: DataTypes.ENUM,
            values: ["poison", "rock", "water", "dragon", "flying", "ghost", "electric", "fairy", "normal", "steel", "ice", "shadow", "fighting", "fire", "psychic", "unknown", "ground", "bug", "grass", "dark"],
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
};