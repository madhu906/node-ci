module.exports = {
  googleClientID:
    '70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com',
  googleClientSecret: '8mkniDQOqacXtlRD3gA4n2az',
  // mongoURI: 'mongodb://readonly:password@ds063124.mlab.com:63124/blog_everyone',
  // mongoURI:'mongodb+srv://node_training:nodetraining@cluster0.7otmb.mongodb.net/node_training?retryWrites=true&w=majority',
  mongoURI:"mongodb://node_training:nodetraining@cluster0-shard-00-00.7otmb.mongodb.net:27017,cluster0-shard-00-01.7otmb.mongodb.net:27017,cluster0-shard-00-02.7otmb.mongodb.net:27017/node_training?ssl=true&replicaSet=atlas-d4yg7z-shard-0&authSource=admin&retryWrites=true&w=majority",

  cookieKey: '123123123',
  redisUrl :'redis://127.0.0.1:6379'
};
