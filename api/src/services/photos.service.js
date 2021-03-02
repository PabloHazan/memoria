const { getDropboxImages, getDropboxImage } = require('./dropbox.service');
const Cacheable = require('../framework/cache/cache');
const { DROPBOX_CACHE_KEY } = require('../constants');

const createImagePath = imageName => `Grandes/${imageName}`;
const miniaturesFolder = 'Chicas/';
const mainImageName = 'mosaico.jpg';

const findMiniatures = async () => await getDropboxImages(miniaturesFolder);

const findMainImage = async () => await getDropboxImage(mainImageName);

const findImage = async imageName => await getDropboxImage(createImagePath(imageName));

const updateCache = async () => {
    Cacheable.clearBucket(DROPBOX_CACHE_KEY);
    await findMiniatures();
    await findMainImage();
}

module.exports = {
    findMiniatures,
    findMainImage,
    findImage,
    updateCache,
}