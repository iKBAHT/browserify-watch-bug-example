# browserify-watch-bug-example
Illustration of this bug https://github.com/substack/watchify/issues/177

Steps:
* npm i
* grunt watch
* node build.js
* change "userInfo.js" file, for example, change name "Bob" to "Bob1"
* automatically - Running "browserify:watch"  
* node build.js
* see an error
