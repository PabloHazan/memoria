const fs = require('fs');
const path = require('path');

const imagesFolder = path.join(__dirname, '..', '..', 'images');
const miniaturesFolder = path.join(imagesFolder, 'miniatures');

const assetsPath = 'http://localhost:8080/assets/';
const miniaturesPath = assetsPath + 'miniatures/';
const photosPath = assetsPath + 'pictures/';

const createPhoto = (name) => ({
    miniaturePath: `${miniaturesPath}${name}`,
    path: `${photosPath}${name}`,
})

const findPaths = () => fs
    .readdirSync(miniaturesFolder)
    .map(createPhoto)

const findMainImagePath = () => assetsPath + fs
    .readdirSync(imagesFolder)
    .find(path => /^.*\.JPG$/.test(path))

module.exports = {
    findPaths,
    findMainImagePath,
}