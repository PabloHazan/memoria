const {
    getDriveFilesFromFolder,
    getDriveFile,
    reloadDriveConfig,
    getDriveConfig,
} = require('./drive.service');

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
    const basePath = getDriveConfig()[src].maxi;
    return `${basePath}/${imageName}`;
}

const createSoundPath = (soudName, src) => {
    validateSrc(src);
    const basePath = getDriveConfig()[src].audio;
    return `${basePath}/${soudName}`;
}

const loadImages = async src => {
    validateSrc(src);
    const images = await getDriveFilesFromFolder(getDriveConfig()[src].maxi);
    const soundPath = getDriveConfig()[src].audio;
    await Promise.all(images.map(image => getDriveFile(soundPath + '/' + image.name.replace('.jpg', '.mp3'))));
}

const loadCollageImages = async () => await loadImages(COLLAGE_SRC);
const loadRoundImages = async () => await loadImages(ROUND_SRC);

const findMiniatures = async src => {
    validateSrc(src);
    return getDriveFilesFromFolder(getDriveConfig()[src].mini);
}

const findCollageMiniatures = async () => await findMiniatures(COLLAGE_SRC);
const findRoundMiniatures = async () => await findMiniatures(ROUND_SRC);

const findMainImage = async () => await getDriveFile(getDriveConfig().fondo);

const findImage = async (imageName, src) => await getDriveFile(createImagePath(imageName, src));

const updateCache = async () => {
    Cacheable.clearBucket(DROPBOX_CACHE_KEY);
    await reloadDriveConfig();
    await findCollageMiniatures();
    await findMainImage();
    await findRoundMiniatures();
    await loadCollageImages();
    await loadRoundImages();
    await findMainSound()
    console.log(JSON.stringify(getDriveConfig(), null, 2));
}

const findImagesByRow = () => getDriveConfig().columnas;

const findMainSound = () => getDriveFile(getDriveConfig().audio);

const findSoundByImageName = async (imageName, src) => {
    try {
        const songName = await getDriveFile(createSoundPath(imageName.match(/^(.*)\.jpg$/)[1] + '.mp3', src));
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