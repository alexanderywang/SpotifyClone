const router = require('express').Router()
const {Album, Artist, Track} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      include: [Artist]
    })
    res.json(albums)
  } catch (err) {
    next(err)
  }
})

router.get('/:albumId', async (req, res, next) => {
  try {
    const foundAlbum = await Album.findByPk(req.params.albumId, {
      include: [{model: Track}, {model: Artist}]
    })
    if (foundAlbum) {
      res.json(foundAlbum)
    } else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

module.exports = router
