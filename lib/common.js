/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

// merges another object into the current object, overwriting any existing values
Object.merge = function (dst, src) {
  for (var i in src) dst[i] = src[i];
  return dst;
};

// formats a [multi-line] string into its HTML equivalent
String.prototype.toHtml = function () {
  return this.replace(/(\n)/g, '<br />$1');
};

var fs = require('fs')
  , option = require('./option').option
  , querystring = require('querystring')
  , self = this;

// directory operations
this.dir = {

  create: function (path, mode) {
    try { fs.mkdirSync(path, mode || option.fs.mode); }
    catch (error) { throw error; }
  },

  // find all files within a given directory with a given extension
  find: function (path, ext) {
    var found = [], re = new RegExp('^(.+)\.' + ext + '$');
    self.dir.read(path).forEach(function (e, i) { if (re.test(e)) found.push(e); });
    return found;
  },

  // include all files with a given exntesion within a given directory
  // (this is the counterpart to node's require() for non-js/node files)
  include: function (path, ext) {
    var obj = {}, re = new RegExp('^(.+)\.' + ext + '$');
    self.dir.find(path, ext).forEach(function (e, i) {
      var contents = self.file.read(path + '/' + e);
      obj[e.replace(re, '$1')] = contents;
    });
    return obj;
  },

  // read the contents of a directory
  read: function (path) {
    try { return fs.readdirSync(path); }
    catch (error) { throw error; }
  },

  // require all the '.js' files within a given directory
  require: function (path) {
    var obj = {}, re = /^(.+)\.js$/;
    self.dir.find(path, 'js').map(function (e) {
      return e.replace(re, '$1');
    }).forEach(function (e, i) {
      obj[e] = require(path + '/' + e);
    });
    return obj;
  }

};

// exception operations
this.exception = function (error) {
  return error.stack;
};

// file operations
this.file = {

  // close a file
  close: function (fd) {
    try { fs.closeSync(fd); }
    catch (error) { throw error; }
  },

  // open a file
  open: function (file, flags, mode) {
    try { return fs.openSync(file, flags, mode || option.fs.mode); }
    catch (error) { throw error; }
  },

  // read a file
  read: function (file) {
    try { return fs.readFileSync(file, 'utf8'); }
    catch (error) { throw error; }
  },

  // write string data to a file
  write: function (fd, data) {
    var buffer = new Buffer(data, 'utf8');
    try { fs.write(fd, buffer, 0, buffer.length, null); }
    catch (error) { throw error; }
  },

  // write data to a file and close
  writeFile: function (file, data) {
    try { fs.writeFileSync(file, data); }
    catch (error) { throw error; }
  }

};

// url operations
this.url = {

  // parse a url into its uri and querystring components
  parse: function (url) {
    var pieces = url.split(/\?/);
    return {
      uri: pieces[0].split(/\//).filter(function (e) { return e; }),
      qs: querystring.parse(pieces[1])
    };
  }

};
