const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;
const redis = require('redis');
const {cookieKey} = require('../config/prod')
const keys = require('../config/keys');
// const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(keys.redisURL);
const util = require('util');
// client.get = util.promisify(client.get);
client.hget = util.promisify(client.hget);
mongoose.Query.prototype.cache = function(options={}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

mongoose.Query.prototype.exec = async function(){
    if(!this.useCache){
        return exec.apply(this, arguments);
    }
    console.log("Cache logic appears here");
    const firstKey = JSON.stringify(this.getQuery());
    console.log(firstKey)
    const key = JSON.stringify(Object.assign({}, JSON.parse(firstKey), {
        collection: this.mongooseCollection.name
    }));
    // const cachedValue = await client.get(key)
    console.log(this.hashKey,key)
    const cachedValue = await client.hget(this.hashKey,key)
    if(cachedValue){
       const doc =  JSON.parse(cachedValue);
     return  Array.isArray(doc) ? 
        doc.map(d => new this.model(d))
       :
        new this.model(doc)
    }
    console.log("outside")
    const result = await exec.apply(this, arguments);
    // client.set(key, JSON.stringify(result))
    client.hset(this.hashKey,key, JSON.stringify(result))
    return result;
};

module.exports = {
     clearHash(hashKey) {
         console.log("Hashkey",hashKey)
        client.del(JSON.stringify(hashKey))
     } 
}