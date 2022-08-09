const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mygames extends Model { }

Mygames.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        videogames_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'videogames',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'mygames',
    }
);

module.exports = Mygames;