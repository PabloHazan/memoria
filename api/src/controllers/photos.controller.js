const {
    findCollageMiniatures,
    findMainImage,
    findImage,
    updateCache,
    findImagesByRow,
    findRoundMiniatures,
} = require("../services/photos.service")

const getPhotos = async (req, res) => {
    const images = await findCollageMiniatures();
    backgroundImage = await findMainImage();
    const imagesByRow = await findImagesByRow();
    const round = await findRoundMiniatures();
    res.send({
        images,
        backgroundImage,
        imagesByRow,
        round,
    })
}

const getPhoto = async (req, res) => {
    const { name } = req.params;
    const { src } = req.query
    const image = await findImage(name, src);
    res.send({
        name,
        url: image
    })
}

const reload = async (req, res) => {
    await updateCache();
    res.send({ status: 'reloaded' })
}

module.exports = {
    getPhotos,
    getPhoto,
    reload,
}