const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artists: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  // id: {
  //   type: Sequelize.STRING,
  //   primaryKey: true
  // },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Album

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })
