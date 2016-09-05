module.exports = {
  'dbUrl': 'mongodb://data02.audacy.space:3101/test',
  'dbOptions': {
    'user': 'audacyapp',
    'pass': 'quindar',
    'auth': {
      'authdb': 'admin'
    },
    "server": {   
      "auto_reconnect": true,
      "poolSize": 200,
      "socketOptions": {
         "keepAlive": 1
      }
    }
  }
};
