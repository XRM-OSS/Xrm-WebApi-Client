const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/js/WebApiClient.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'WebApiClient.min.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: "some"  
          }
        },
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: "WebApiClient.LICENSE.txt",
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          }
        },
      }),
    ],
  }
};