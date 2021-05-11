const fs = require('fs');

const MINIATURE_FOLDER = base => base + 'Small/';
const BIG_FOLDER = base => base + 'Big/';
const BIG_ROUND_FOLDER = base => base + 'Big Round/';
const MINIATURE_ROUND_FOLDER = base => base + 'Small Round/';


const BASE_IMAGE_URL = '/static/images/';
const MINIATURES_URL = MINIATURE_FOLDER(BASE_IMAGE_URL);
const MINIATURES_ROUND_URL = MINIATURE_ROUND_FOLDER(BASE_IMAGE_URL);
const BIG_URL = BIG_FOLDER(BASE_IMAGE_URL);
const BIG_ROUND_URL = BIG_ROUND_FOLDER(BASE_IMAGE_URL);
const SONGS_URL = BASE_IMAGE_URL + 'Palabras/'

const MAIN_IMAGE_URL = BASE_IMAGE_URL + 'mosaico.jpg';
const MAIN_SOUND_URL = BASE_IMAGE_URL + 'musica.mp3';

const IMAGES_PATH = './api/ui/static/images/';
const MINIATURES_PATH = MINIATURE_FOLDER(IMAGES_PATH);
const MINIATURES_ROUND_PATH = MINIATURE_ROUND_FOLDER(IMAGES_PATH);
const SONGS_PATH = IMAGES_PATH + 'Palabras/'


const {
    ROUND_SRC,
    VALID_SRCS,
} = require('../constants');


const validateSrc = src => {
    if (!VALID_SRCS.includes(src))
        throw new Error(`${src} es una fuente incorrecta`);
}

const createImagePath = (imageName, src) => {
    validateSrc(src);
    const baseUrl = src === ROUND_SRC ? BIG_ROUND_URL : BIG_URL;
    return `${baseUrl}/${imageName}`;
}

const createSoundPath = soudName => fs.existsSync(SONGS_PATH + soudName) ? `${SONGS_URL}/${soudName}` : null;


const findMiniaturesAndCreatePath = (BASE_PATH, BASE_URL) => fs.readdirSync(BASE_PATH).map(name => ({
    url: `${BASE_URL}${name}`,
    name
}))

const findCollageMiniatures = () => findMiniaturesAndCreatePath(MINIATURES_PATH, MINIATURES_URL);

const findRoundMiniatures = () => findMiniaturesAndCreatePath(MINIATURES_ROUND_PATH, MINIATURES_ROUND_URL)

const findMainImage = () => MAIN_IMAGE_URL;

const findImage = (imageName, src) => createImagePath(imageName, src);

const findImagesByRow = () => 20;

const findMainSound = () => MAIN_SOUND_URL;

const findSoundByImageName = (imageName) => {
    const soundName = imageName.match(/^(.*)\.jpg$/)[1] + '.mp3';
    return createSoundPath(soundName);
}

module.exports = {
    findCollageMiniatures,
    findMainImage,
    findImage,
    findSoundByImageName,
    findImagesByRow,
    findRoundMiniatures,
    findMainSound,
}