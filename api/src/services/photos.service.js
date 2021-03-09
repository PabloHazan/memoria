const {
    getDropboxImages,
    getDropboxImage,
    reloadDropboxConfig,
    getDropboxConfig
} = require('./dropbox.service');
const Cacheable = require('../framework/cache/cache');
const { DROPBOX_CACHE_KEY } = require('../constants');

const createImagePath = imageName => `${getDropboxConfig().collage.maxi}/${imageName}`;

const findMiniatures = async () => await getDropboxImages(getDropboxConfig().collage.mini);

const findMainImage = async () => await getDropboxImage(getDropboxConfig().fondo);

const findImage = async imageName => await getDropboxImage(createImagePath(imageName));

const updateCache = async () => {
    Cacheable.clearBucket(DROPBOX_CACHE_KEY);
    await reloadDropboxConfig();
    await findMiniatures();
    await findMainImage();
    console.log(JSON.stringify(getDropboxConfig(), getDropboxConfig()));

}

module.exports = {
    findMiniatures,
    findMainImage,
    findImage,
    updateCache,
}