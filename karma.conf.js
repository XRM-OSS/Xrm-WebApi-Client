// Karma configuration
// Generated on Sun Oct 16 2016 22:01:24 GMT+0200 (Mitteleuropäische Sommerzeit)

var istanbul = require('browserify-istanbul')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
    			'karma-phantomjs-launcher'
    			, 'karma-coverage'
    			, 'karma-jasmine'
    			, 'karma-browserify'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'src/js/*.js',
      'src/spec/*.js'
    ],


    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/*.js' : ['browserify'],
      'src/spec/*.js' : ['browserify']
    },

    coverageReporter: {
    			reporters: [
    				{ type: 'html' },
            { type: 'lcov' },
            { type: 'text'}
          ],
    			dir : 'coverage'
    },

    browserify: {
    			debug: true,
    			transform: [ 'brfs', istanbul({
    				ignore: ['**/node_modules/**', '**/spec/**']
    			})]
      },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
