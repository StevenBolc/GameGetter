const Videogame = require('./Videogame');
const User = require('./User');
const Mygames = require('./Mygames')

Videogame.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Videogame.hasMany(Mygames, {
    foreignKey: 'videogames_id'
})

User.hasMany(Videogame, {
    foreignKey: 'user_id'
});

User.hasMany(Mygames, {
    foreignKey: 'user_id'
});

Mygames.belongsTo(User, {
    foreignKey: 'user_id',
});

Mygames.belongsTo(Videogame, {
    foreignKey: 'videogames_id'
});

module.exports = { Videogame, User };

