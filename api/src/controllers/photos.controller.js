const {
    findCollageMiniatures,
    findMainImage,
    findImage,
    findSoundByImageName,
    findImagesByRow,
    findRoundMiniatures,
    findMainSound,
} = require("../services/photos.service")

const getPhotos = (req, res) => {
    const images = findCollageMiniatures();
    const backgroundImage = findMainImage();
    const imagesByRow = findImagesByRow();
    const round = findRoundMiniatures();
    const sound = findMainSound();
    res.send({
        images,
        backgroundImage,
        imagesByRow,
        round,
        sound,
    })
}

const getPhoto = (req, res) => {
    const { name } = req.params;
    const { src } = req.query
    const image = findImage(name, src);
    const sound = findSoundByImageName(name);
    res.send({
        name,
        url: image,
        sound
    })
}

module.exports = {
    getPhotos,
    getPhoto,
}