var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');

module.exports = function (grunt) {
  grunt.registerTask('watch', 'Grunt task for browserify.', function () {
    var runner = new GruntBrowserifyRunner({
      grunt: grunt
    });
    runner.run([path.resolve("main.js")], "build.js");

    this.async()
  });
};

function GruntBrowserifyRunner(options) {
  this.grunt = options.grunt;
}

GruntBrowserifyRunner.prototype =  {
  run: function (files, destination) {
    var bOpts = {
      fullPaths: false,
      debug: true,
      entries: files,
      cache: {},
      packageCache: {}
    };

    var b = watchify(browserify(bOpts), {});

    b.require('./userInfo.js', {expose: 'user'});
    b.require('./lib/trim.js', {expose: 'trim'});

    var bundleUpdate = this.onBundleComplete(destination);

    b.on('update', function (ids) {
      ids.forEach(function (id) {
        console.log(id.cyan + ' changed, updating bundle.');
      });
      doBundle(b, bundleUpdate);
    });

    doBundle(b, bundleUpdate);
  },

  onBundleComplete: function (destination) {
    var self = this;
    return function (err, buf) {
      if (err) {
        console.log(err);
      }
      else if (buf) {
        console.log('Bundle ' + destination.cyan + ' created. ' + 'Watchifying...');
        self.grunt.file.write(destination, buf);
      }
    };
  }
};

function doBundle(browserifyInstance, bundleComplete) {
  browserifyInstance.bundle(function (err, buf) {
      bundleComplete(err, buf);
  });
}