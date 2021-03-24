const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');
const Cacheable = require('../framework/cache/cache');
const { DROPBOX_CACHE_KEY, DROPBOX_CONFIG_FILE, DROPBOX_FILE_BASE_URL } = require('../constants');
const CacheDropbox = Cacheable(DROPBOX_CACHE_KEY, { ttl: Cacheable.INFINITY })

const accessToken = 'hfkEjlS76UMAAAAAAAAAAdt5EjPvG7xd5WHYfNRBLoz0ADZAFmnzVGPxSfbQga-H';
const dbx = new Dropbox({
    accessToken,
    fetch
});

let _config = null;
const getConfig = () => _config;
const setConfig = conf => _config = conf;

const createPath = (path = '') => [getConfig().base, path].join('/');


const processUrl = url => url.slice(0, DROPBOX_FILE_BASE_URL.length) + 'raw/' + url.slice(DROPBOX_FILE_BASE_URL.length)

const getUrlFromPath = CacheDropbox(async path => {
    try {
        const { result: { url } } = await dbx.sharingCreateSharedLink({ path });
        const finalUrl = processUrl(url);
        console.log('path', path, 'url', finalUrl);
        // return url + '&raw=1';
        return finalUrl;
    } catch (error) {
        console.log('Error al buscar la url para', path);
        return null;
    }
})

const createImageFromFile = async file => ({
    name: file.name,
    url: await getUrlFromPath(file.path_display),
})

const createChunks = (list, maxSize) => {
    const chunks = [];
    for (let index = 0; index < list.length; index += maxSize) {
        chunk = list.slice(index, index + maxSize);
        chunks.push(chunk);
    }
    return chunks;
}

const mapWithChunks = async (list, maxSize, map) => {
    const chunks = createChunks(list, maxSize);
    let results = [];
    for (let chunk of chunks) {
        const result = await Promise.all(chunk.map(map));
        results.push(result);
    }
    const flatResults = results.flat();
    return flatResults
}

const getFiles = async path => {
    try {
        const { result: { entries } } = await dbx.filesListFolder({
            path: createPath(path),
        });
        return entries;
    } catch (error) {
        console.log(error)
        throw new Error('Error al explorar el path', path)
    }
}

const getImages = async (path = '') => {
    const entries = await getFiles(path);
    return (await mapWithChunks(entries, 50, createImageFromFile)).sort((a, b) => a.name <= b.name ? -1 : 1);
}

const getImage = path => getUrlFromPath(createPath(path))

const readFile = async name => {
    const config = await dbx.filesDownload({
        path: name
    })
    return JSON.parse(new String(config.result.fileBinary));
}

const reloadConfig = async () => {
    try {
        setConfig(await readFile(DROPBOX_CONFIG_FILE));
    } catch (error) {
        console.error('Error: no pudo leerse el archivo de configuracion de dropbox', error);
        console.error(error);
        throw new Error('Config dropbox error');
    }
}

module.exports = {
    getDropboxImages: getImages,
    getDropboxFile: getImage,
    reloadDropboxConfig: reloadConfig,
    getDropboxConfig: getConfig,
}
