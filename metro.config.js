const path = require('path');

module.exports = {
  resolver: {
    // Defina o alias para a pasta assets
    extraNodeModules: {
      assets: path.resolve(__dirname, 'assets'),
    },
  },
};
