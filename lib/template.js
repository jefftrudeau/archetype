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

try { eval(common.file.read(__dirname+'/externals/json-template.js')); }
catch (error) { throw error; }

this.template = {

  _templates: null,

  init: function () {
    self._templates = {};
    [__dirname, archetype_project_root].forEach(function (e, i) {
      var templates = common.dir.include(e+'/templates', 'html');
      for (var j in templates) self._templates[j] = jsontemplate.Template(templates[j]);
    });
    log.debug('Templates', self._templates);
  },

  render: function (template, data) {
    try {
      return self._templates[template].expand(data);
    }
    catch (error) {
      throw error;
    }
  }

};

var self = this.template;
