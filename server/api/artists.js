const router = require('express').Router()
const {Artist, Album, Track} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      include: [Album]
    })
    res.json(artists)
  } catch (err) {
    next(err)
  }
})

router.get('/:artistId', async (req, res, next) => {
  try {
    const foundArtist = await Artist.findByPk(req.params.artistId)
    if (foundArtist) {
      res.json(foundArtist)
    } else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

module.exports = router
