const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Videogame extends Model { }

Videogame.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year_of_release: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        global_sales: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        critic_score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        critic_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        developer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'videogame',
    }
);

module.exports = Videogame;
