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
    log = require('./log').log,
    option = require('./option').option.database,
    sequelize = require('sequelize').Sequelize;

this.database = {

  _ds: null,

  models: null,

  init: function () {
    var re = /(BOOLEAN|DATE|INTEGER|STRING|TEXT)/g;
    self._ds = new sequelize(option.database, option.username, option.password, option.options);
    self.models = {};
    [__dirname, archetype_project_root].forEach(function (e, i) {
      try {
        var defs = common.dir.include(e+'/models', 'js');
        for (var j in defs) {
          eval(defs[j].replace(re, 'sequelize.$1'));
          for (var k in models) self.models[k] = self._ds.define(k, models[k]);
        }
      }
      catch (error) {
        throw error;
      }
    });
    log.debug('Models', self.models);
  },

  syncAll: function() {
    self.models.forEach(function (e, i) { e.sync(); });
  },

};

var self = this.database;
