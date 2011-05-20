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
  , option = require('./option').option.cache;

this.cache = {

  _cache: null,

  init: function () {
    self._cache = new Memcached(option.servers);
    log.debug('Cache', self._cache);
  },

  get: function (key, callback) {
    self._cache.get(key, callback);
  },

  set: function (key, value, callback, lifetime) {
    self._cache.set(key, value, lifetime || option.lifetime, callback);
  }
};

var self = this.cache;
