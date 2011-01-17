/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var common = require('./common');

if (typeof(archetype_project_root) != 'undefined')
  var option = require(archetype_project_root+'/option').option;

this.option = Object.merge({

  debug: true,

  fs: {
    mode: 0755
  },

  log: {
    truncate: false,
    logs: ['/var/log/archetype.log']
  }

}, option || {});
