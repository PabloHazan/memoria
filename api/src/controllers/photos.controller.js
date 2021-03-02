const { 
    findMiniatures,
    findMainImage,
    findImage,
    updateCache,
} = require("../services/photos.service")

const getPhotos = async (req, res) => {
    const images = await findMiniatures();
    backgroundImage = await findMainImage();
    res.send({
        images,
        backgroundImage
    })
}

const getPhoto = async (req, res) => {
    const { name } = req.params;
    const image = await findImage(name)
    res.send({
        name,
        url: image
    })
}

const reload = async (req, res) => {
    await updateCache();
    res.send({status: 'reloaded'})
}

module.exports = {
    getPhotos,
    getPhoto,
    reload,
}