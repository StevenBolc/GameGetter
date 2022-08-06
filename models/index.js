const Videogame = require('./Videogame');
const User = require('./User');

// Videogame.belongsTo(User, {
//   foreignKey: 'videogame_id',
//   onDelete: 'CASCADE'
// });

// User.hasMany(Videogame, {
//   foreignKey: 'videogame_id'
// });

module.exports = { Videogame, User };

