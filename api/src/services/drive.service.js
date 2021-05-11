const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const scopes = [
    'https://www.googleapis.com/auth/drive',
];
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

// --------------------------------------------------

const Cacheable = require('../framework/cache/cache');
const { DROPBOX_CACHE_KEY, CONFIG_FILE_NAME } = require('../constants');
const CacheDrive = Cacheable(DROPBOX_CACHE_KEY, { ttl: Cacheable.INFINITY })

// --------------------------------------------------
let config;

const reloadConfig = async () => {
    config = await readFile(CONFIG_FILE_NAME)
}

const getConfig = () => config;
// --------------------------------------------------


const getDriveId = CacheDrive(async path => {
    const aux = path.split('/');
    const folders = aux.slice(0, -1).filter(f => f);
    const fileName = aux[aux.length - 1];
    let lastFolderId = undefined;
    const createFolderCondition = q => q + (
        lastFolderId ?
            `and '${lastFolderId}' in parents`
            : '' // TODO: revisar como hacer para que no tenga padre
    );
    for (const folder of folders) {
        const { data: { files: [{ id: fileId }] } } = await drive.files.list({
            q: createFolderCondition(`name = '${folder}'`),
            fields: 'files(id)',
        });
        lastFolderId = fileId;
    }

    const { data: { files: [{ id: fileId }, ...moreFiles] } } = await drive.files.list({
        q: createFolderCondition(`name = '${fileName}'`),
        fields: 'files(id)',
    });
    if (moreFiles.length > 0) throw new Error('Se encontro mas de un archivo con ese nombre')
    return fileId;
})

const readFile = CacheDrive(async filePath => {
    const fileId = await getDriveId(filePath)
    const { data } = await drive.files.get({ fileId, alt: 'media' });
    return data;
})

const mapFile = ({ name, webContentLink, id }) => ({
    name,
    // url: webContentLink//.replace('&export=download', ''),
    url: 'https://drive.google.com/u/1/uc?id=' + id,
})

const getFilesFromFolder = CacheDrive(async path => {
    try {
        const googleFolderId = await getDriveId(path);
        const { data: { files } } = await drive.files.list({
            q: `'${googleFolderId}' in parents`,
            pageSize: 1000,
            fields: 'files(id, name, webContentLink)',
        })
        return files.map(mapFile).sort((a, b) => a.name <= b.name ? -1 : 1);
    } catch (error) {
        // console.log(error)
    }
})

const getFile = CacheDrive(async path => {
    try {
        const fileId = await getDriveId(path);
        const { data: file } = await drive.files.get({
            fileId,
            fields: 'id, name, webContentLink',
        })
        return mapFile(file).url;
    } catch (error) {
        // console.log(error)
    }
})


module.exports = {
    getDriveConfig: getConfig,
    reloadDriveConfig: reloadConfig,
    getDriveFile: getFile,
    getDriveFilesFromFolder: getFilesFromFolder,
}
