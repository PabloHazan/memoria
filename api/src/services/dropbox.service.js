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

const createPath = (path = '') => [ '/Pablo', path ].join('/');

const getUrlFromPath = async path => {
    const { result: {url} } = await dbx.sharingCreateSharedLink({path});
    console.log (path, url)
    return url + '&raw=1';
}

const createImageFromFile = async file => ({
    name: file.name,
    url: await getUrlFromPath(file.path_display),
})

// TODO: agregar cache
const getImages = async (path = '') => {
    // const { result: { entries } } = await dbx.filesListFolder({
    //     path: createPath(path),
    // });
    return await dbx.sharingGetSharedLinks({path: createPath(path)})
    // return await Promise.all(entries.map(createImageFromFile))
}

// TODO: agregar cache
const getImage = path => getUrlFromPath(createPath(path))

module.exports = {
    getDropboxImages: CacheDropbox(getImages),
    getDropboxImage: CacheDropbox(getImage),
}
