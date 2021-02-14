const { getPhotos } = require('../controllers/photos.controller');

const router = require('express').Router();

router.get('/', getPhotos);

module.exports = router;