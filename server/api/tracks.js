const router = require('express').Router()
const {Track} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const tracks = await Track.findAll({})
    res.json(tracks)
  } catch (err) {
    next(err)
  }
})

router.get('/:trackId', async (req, res, next) => {
  try {
    const foundTrack = await Track.findByPk(req.params.trackId)
    if (foundTrack) {
      res.json(foundTrack)
    } else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

module.exports = router
