const {
    getDropboxImages,
    getDropboxFile,
    reloadDropboxConfig,
    getDropboxConfig
} = require('./dropbox.service');
const Cacheable = require('../framework/cache/cache');
const {
    DROPBOX_CACHE_KEY,
    ROUND_SRC,
    COLLAGE_SRC,
    VALID_SRCS,
} = require('../constants');

const validateSrc = src => {
    if (!VALID_SRCS.includes(src))
        throw new Error(`${src} es una fuente incorrecta`);
}

const createImagePath = (imageName, src) => {
    validateSrc(src);
    const basePath = getDropboxConfig()[src].maxi;
    return `${basePath}/${imageName}`;
}

const createSoundPath = (soudName, src) => {
    validateSrc(src);
    const basePath = getDropboxConfig()[src].audio;
    return `${basePath}/${soudName}`;
}

const findMiniatures = async src => {
    validateSrc(src);
    return getDropboxImages(getDropboxConfig()[src].mini);
}

const findCollageMiniatures = async () => await findMiniatures(COLLAGE_SRC);
const findRoundMiniatures = async () => await findMiniatures(ROUND_SRC);

const findMainImage = async () => await getDropboxFile(getDropboxConfig().fondo);

const findImage = async (imageName, src) => await getDropboxFile(createImagePath(imageName, src));

const updateCache = async () => {
    Cacheable.clearBucket(DROPBOX_CACHE_KEY);
    await reloadDropboxConfig();
    await findCollageMiniatures();
    await findMainImage();
    await findRoundMiniatures();
    console.log(JSON.stringify(getDropboxConfig(), null, 2));
}

const findImagesByRow = () => getDropboxConfig().columnas;

const findMainSound = () => getDropboxFile(getDropboxConfig().audio);

const findSoundByImageName = async (imageName, src) => {
    try {
        const songName = await getDropboxFile(createSoundPath(imageName.match(/^(.*)\.jpg$/)[1] + '.mp3', src));
        return songName;
    } catch (error) {
        return null;
    }
}

module.exports = {
    findCollageMiniatures,
    findMainImage,
    findImage,
    findSoundByImageName,
    updateCache,
    findImagesByRow,
    findRoundMiniatures,
    findMainSound,
}