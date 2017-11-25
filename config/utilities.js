const fs = require('fs');
const path = require('path');

const getConfigPath = (file_name) => {
  if (fs.existsSync(path.resolve('config', `${file_name}-local.js`))) {
    return path.resolve('config', `${file_name}-local.js`);
  } else if (fs.existsSync(path.resolve('config', `${file_name}.js`))) {
    return path.resolve('config', `${file_name}.js`);
  }
  throw new Error(`File ${file_name} is not a config file that exists.`);
};

const loadConfigFile = file_name => require(getConfigPath(file_name));

module.exports = { getConfigPath, loadConfigFile };
