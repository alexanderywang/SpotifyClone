const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Track = db.define('track', {
  //artists for spotify, artist for juke
  artists: {
    type: Sequelize.ARRAY(Sequelize.STRING)
    // allowNull: false
  },
  // artist: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   allowNull: false
  // },
  // album: {
  //   type: Sequelize.ARRAY(Sequelize.STRING)
  // },
  name: {
    type: Sequelize.STRING
  }
  // id: {
  //   type: Sequelize.STRING
  // }
})

module.exports = Track

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
