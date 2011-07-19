/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var log = require('./log').log
  , memcached = require('memcached')
  , option = require('./option').option.memcache;

this.memcache = {

  _memcached: null,

  init: function () {
    self._memcached = new memcached(option.servers);
    log.debug('Cache', self._memcached);
  },

  get: function (key, callback) {
    self._memcached.get(key, callback);
  },

  set: function (key, value, callback, lifetime) {
    self._memcached.set(key, value, lifetime || option.lifetime, callback);
  }
};

var self = this.memcache;
