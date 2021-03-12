const {
    getDropboxImages,
    getDropboxImage,
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

const findMiniatures = async src => {
    validateSrc(src);
    return getDropboxImages(getDropboxConfig()[src].mini);
}

const findCollageMiniatures = async () => await findMiniatures(COLLAGE_SRC);
const findRoundMiniatures = async () => await findMiniatures(ROUND_SRC);

const findMainImage = async () => await getDropboxImage(getDropboxConfig().fondo);

const findImage = async (imageName, src) => await getDropboxImage(createImagePath(imageName, src));

const updateCache = async () => {
    Cacheable.clearBucket(DROPBOX_CACHE_KEY);
    await reloadDropboxConfig();
    await findCollageMiniatures();
    await findMainImage();
    await findRoundMiniatures();
    console.log(JSON.stringify(getDropboxConfig(), getDropboxConfig()));
}

const findImagesByRow = () => getDropboxConfig().columnas;


module.exports = {
    findCollageMiniatures,
    findMainImage,
    findImage,
    updateCache,
    findImagesByRow,
    findRoundMiniatures,
}