/**
 * Archetype, a web framework leveraging Node.js.
 *   http://github.com/jefftrudeau/archetype
 *
 * Released under the GNU General Public License, version 2.
 *   http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (C) Jeff Trudeau
 */

var common = require('./common'),
    log = require('./log').log;

this.route = {

  _routes: null,

  find: function (url) {
    for (var i in self._routes)
      if (self._routes[i].pattern && self._routes[i].pattern.test(url)) return self._routes[i];
  },

  init: function () {
    self._routes = {};
    [__dirname, archetype_project_root].forEach(function (e, i) {
      try {
        var defs = common.dir.include(e+'/routes', 'js');
        for (var j in defs) {
          eval(defs[j]);
          for (var k in routes) {
            var obj = {};
            for (var l in routes[k])
              obj[l] = (l == 'pattern' ? new RegExp(routes[k][l]) : routes[k][l]);
            self._routes[k] = obj;
          }
        }
      }
      catch (error) {
        throw error;
      }
    });
    log.debug('Routes', self._routes);
  }

};

var self = this.route;
