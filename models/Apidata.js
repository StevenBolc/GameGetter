const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Apidata extends Model { }

// https://api.rawg.io/docs/#operation/games_read

Apidata.init(
    {
        // Name must match the name from table videogames
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        background_image: {
            type: DataTypes.STRING, // This will be a URL in the form of a string... add inside img src in repeated result layout
            allowNull: true,
        },
        background_image_additional: {
            type: DataTypes.STRING, // This will be the img alt text that goes along with the background_image
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING, // This will be a URL in the form of a string that we can use inside an anchor tag
            allowNull: true,
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'apidata',
    }
);

module.exports = Apidata;