const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Videogame extends Model { }

Videogame.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year_of_release: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        global_sales: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        critic_score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        critic_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        developer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'videogame',
    }
);

module.exports = Videogame;