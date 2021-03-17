const {
    findCollageMiniatures,
    findMainImage,
    findImage,
    findSoundByImageName,
    updateCache,
    findImagesByRow,
    findRoundMiniatures,
    findMainSound,
} = require("../services/photos.service")

const getPhotos = async (req, res) => {
    const images = await findCollageMiniatures();
    const backgroundImage = await findMainImage();
    const imagesByRow = await findImagesByRow();
    const round = await findRoundMiniatures();
    const sound = await findMainSound();
    res.send({
        images,
        backgroundImage,
        imagesByRow,
        round,
        sound,
    })
}

const getPhoto = async (req, res) => {
    const { name } = req.params;
    const { src } = req.query
    const image = await findImage(name, src);
    const sound = await findSoundByImageName(name, src);
    res.send({
        name,
        url: image,
        sound
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