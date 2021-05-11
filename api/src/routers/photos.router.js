const router = require('express').Router();

const {
    getPhotos,
    getPhoto,
} = require('../controllers/photos.controller');


router.get('/', getPhotos);
router.get('/:name', getPhoto);

module.exports = router;