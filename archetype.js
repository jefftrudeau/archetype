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
this.database = require('./lib/database').database;
this.log = require('./lib/log').log;
this.option = require('./lib/option').option;
this.route = require('./lib/route').route;
this.server = require('./lib/server').server;
this.service = require('./lib/service').service;
this.template = require('./lib/template').template;
