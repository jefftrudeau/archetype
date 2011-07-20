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
  , redis = require('redis')
  , option = require('./option').option.redis;

this.redis = {

  _redis: null,

  init: function () {
    self._redis = redis.createClient(option.port, option.host);
    log.debug('Redis', self._redis);
  },

  send_command: function (name, args, callback) {
    return self._redis.send_command(name, args, callback);
  }

};

var self = this.redis;