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

this.service = {

  services: null,

  init: function () {
    self.services = {};
    [__dirname, archetype_project_root].forEach(function (e, i) {
      Object.merge(self.services, common.dir.require(e+'/services'));
    });
    log.debug('Services', self.services);
  },

  route: function (request, response) {
    var f = 'self.services.' + request.__route.service + '.' + request.__route.callback;
    try {
      eval('data = ' + f + '(request, response)');
      return data || {};
    }
    catch (error) {
      throw error;
    }
  }

};

var self = this.service;
