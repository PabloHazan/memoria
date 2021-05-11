const {
    getPhotos,
    getPhoto,
    // reload,
} = require('../controllers/photos.controller');

const router = require('express').Router();

router.get('/', getPhotos);
// router.get('/reload', reload);
router.get('/:name', getPhoto);

module.exports = router;