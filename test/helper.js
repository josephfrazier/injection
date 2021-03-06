'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var env = require('jsdom').env;

module.exports = function(file, url, done) {
  var content, baseUrl, filePath;
  baseUrl = 'https://github.com/octo-linker/injection/';

  if (typeof url === 'function') {
    done = url;
    url = 'blob/master/test/fixtures/' + file;
  }

  url = baseUrl + url;

  if (process.env.TEST_ENV === 'remote') {
    content = url;
    console.log('    remote tests');
  } else {
    console.log('    local tests');
    filePath = util.format('./fixtures/%s', file);
    filePath = path.resolve(__dirname, filePath);
    content = fs.readFileSync(filePath, 'utf-8');
  }

  env(content, function(err, window) {
    if (err) {
      return done(err);
    }

    if (process.env.TEST_ENV !== 'remote') {
      window.document.location.href = url;
    }

    if (process.env.TEST_ENV !== 'remote') {
      window.document.location.href = url;
    }

    done(null, window);
  });
};
