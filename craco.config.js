const path = require('path')

module.exports = {
  webpack: {
    alias: {
      // src folder
      "#src": path.resolve(__dirname, './src'),
      "#abis": path.resolve(__dirname, './src/abis'),
      "#api": path.resolve(__dirname, './src/api'),
      "#app": path.resolve(__dirname, './src/app'),
      "#assets": path.resolve(__dirname, './src/assets'),
      "#components": path.resolve(__dirname, './src/components'),
      "#connectors": path.resolve(__dirname, './src/connectors'),
      "#constants": path.resolve(__dirname, './src/constants'),
      "#hooks": path.resolve(__dirname, './src/hooks'),
      "#pages": path.resolve(__dirname, './src/pages'),
      "#utils": path.resolve(__dirname, './src/utils'),

      // assets folder
      "#images": path.resolve(__dirname, './src/assets/images'),
      "#svg": path.resolve(__dirname, './src/assets/svg'),
    },
  },
}