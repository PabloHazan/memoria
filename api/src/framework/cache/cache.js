const NodeCache = require("node-cache");
const path = require('path');
const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const INFINITY = 0;
const cache = new NodeCache();

const createBucketKey = bucketName => `[${bucketName}]::`;

const createKey = (bucketName, method, params) => 
    `${createBucketKey(bucketName)}${path.basename(module.parent.filename, '.js')}:${method.name}(${params.map(a => JSON.stringify(a)).join()})`;

const Cacheable = (bucketName, { ttl } = { ttl: HOUR }) => (fun) => async (...args) => {
    const key = createKey(bucketName, fun, args);
    let cachedValue = cache.get(key);
    if (!cachedValue) {
        cachedValue = await fun.apply(this, args);
        cache.set(key, cachedValue, ttl);
    }
    return cachedValue;
}

const clearBucket = bucketName => {
    const bucketKey = createBucketKey(bucketName);
    cache.keys().forEach(key => {
        if(key.includes(bucketKey))
            cache.del(key);
    });
}

module.exports = Cacheable;
module.exports.cache = cache;
module.exports.SECOND = SECOND;
module.exports.MINUTE = MINUTE;
module.exports.HOUR = HOUR;
module.exports.INFINITY = INFINITY;
module.exports.clearBucket = clearBucket;
