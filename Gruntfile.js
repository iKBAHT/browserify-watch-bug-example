module.exports = function (grunt) {

  var aliases = [
    './userInfo.js:user',
    './lib/trim.js:trim'
  ];

  grunt.initConfig({
    browserify: {
      watch: {
        files: {
          "build.js": ["main.js"]
        },
        options: {
          alias: aliases,
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            fullPaths: false,
            //cache: true,
            debug: true
          },
          configure: function (b) {
            b.on('log', function (info) {
              console.log(info);
            });
          }
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask("watch", [
    "browserify:watch"
  ]);
};