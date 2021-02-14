const { findPaths, findMainImagePath } = require("../services/photos.service")

const getPhotos = (req, res) => {
    const images = findPaths();
    backgroundImage = findMainImagePath();
    res.send({
        images,
        backgroundImage
    })
}

module.exports = {
    getPhotos,
}