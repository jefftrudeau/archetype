/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var routes = {

  // system index
  system_index: {
    title: 'System',
    mime: 'text/html',
    pattern: '^/system(.*)$',
    service: 'system',
    callback: 'index',
    template: 'system_index'
  }

};
