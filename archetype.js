/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

this.common = require('./lib/common');
this.log = require('./lib/log').log;
this.memcache = require('./lib/memcache').memcache;
this.option = require('./lib/option').option;
this.redis = require('./lib/redis').redis;
this.route = require('./lib/route').route;
this.server = require('./lib/server').server;
this.service = require('./lib/service').service;
