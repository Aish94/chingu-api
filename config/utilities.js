var fs        = require('fs');

module.exports.loadConfigFile = file_name => {
  if(fs.existsSync(__dirname + '/../config/' + file_name + '-local.js')) {
    return require(__dirname + '/../config/' + file_name + '-local.js');
  } else if(fs.existsSync(__dirname + '/../config/' + file_name + '.js')) {
    return require(__dirname + '/../config/' + file_name + '.js');
  } else {
    throw new Error('File ' + file_name + ' is not a config file that exists.');
  }
}