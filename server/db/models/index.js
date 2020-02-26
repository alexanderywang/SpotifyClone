const Album = require('./album')
const Artist = require('./artist')
const Track = require('./track')
const db = require('../db')
const User = require('./user')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Track.belongsTo(Album)
Album.hasMany(Track)
// as or through?
Track.belongsTo(Artist)
Artist.hasMany(Track)

Album.belongsTo(Artist)
Artist.hasMany(Album)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  db,
  Album,
  Artist,
  User,
  Track
}
