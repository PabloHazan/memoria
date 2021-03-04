const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');
const Cacheable = require('../framework/cache/cache');
const { DROPBOX_CACHE_KEY } = require('../constants');
const CacheDropbox = Cacheable(DROPBOX_CACHE_KEY, {ttl: Cacheable.INFINITY})

const accessToken = 'y6dNTYPYn0sAAAAAAAAAAQ8fSh2dhOzZB_znE8x-aRumBVs2Aoe1UVpLgZYT6reQ';
const dbx = new Dropbox({
  accessToken,
  fetch
});

const createPath = (path = '') => [ '/Pablo2', path ].join('/');

const getUrlFromPath = async path => {
    try {
        const { result: { url } } = await dbx.sharingCreateSharedLink({ path });
        console.log (path, url)
        return url + '&raw=1';
    } catch (error) {
        console.log ('Error al buscar la url para', path);
        console.info(error)
        return '';
    }
}

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
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log(flatResults.length)
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('-------------------------------');
    return flatResults
}

const getFiles = async path => {
    const { result: { entries } } = await dbx.filesListFolder({
        path: createPath(path),
    });
    return entries;
}

const getImages = async (path = '') => {
    const entries = await getFiles(path);
    console.log(entries);
    return await mapWithChunks(entries, 50, createImageFromFile);
    // return await Promise.all(entries.map(createImageFromFile))
}

const getImage = path => getUrlFromPath(createPath(path))

const clearUrls = async path => {
    try {
        console.log('-------------->', createPath(path))
        const { result: { links } } = await dbx.sharingGetSharedLinks({ path: ''});
        await Promise.all(links.map(async ({url}) => await dbx.sharingRevokeSharedLink({url})))
    } catch (error) {
        console.log(JSON.stringify(error,null, 4))
    }
}

module.exports = {
    getDropboxImages: CacheDropbox(getImages),
    getDropboxImage: CacheDropbox(getImage),
    clearDropboxUrls: clearUrls,
}
