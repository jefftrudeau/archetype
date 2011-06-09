/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var common = require('./common')
  , option = require('./option').option
  , util = require('util');

this.log = {

  _logs: null,

  debug: function (msg, obj) {
    if (option.debug) self.write('debug', msg, obj);
  },

  error: function (msg, obj) {
    self.write('error', msg, obj);
  },

  info: function (msg, obj) {
    self.write('info', msg, obj);
  },

  init: function () {
    var flags = option.log.truncate ? 'w' : 'a';
    self._logs = [];
    option.log.logs.forEach(function (e, i) { self._logs.push(common.file.open(e, flags)); });
  },

  write: function (level, msg, obj) {
    if (!self._logs) self.init();
    var data = '[' + new Date() + '][' + level + '] ' + msg + '\n';
    if (obj) data += (typeof(obj) == 'object' ? util.inspect(obj, false, null) : obj) + '\n';
    self._logs.forEach(function (e, i) { common.file.write(e, data); });
  }

};

var self = this.log;
